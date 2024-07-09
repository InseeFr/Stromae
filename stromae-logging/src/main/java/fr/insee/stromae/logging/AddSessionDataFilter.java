
package fr.insee.stromae.logging;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.log4j.MDC;

/**
 * Filter added via web.xml configuration
 * Allows to make available
 *    - the session id : %X{sessionId}
 *    - the user-agent : %X{userAgent}
 *    - the IP address IP : %X{ipAddr}
 *    - the survey's id : %X{survey}
 *    - the survey-unit's id : %X{surveyUnit}
 * in stromae log
 * @author Laurent Caouissin
 *
 */
public class AddSessionDataFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	/**
	 * Execute filter: save data session
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
						 FilterChain chain) throws IOException, ServletException {

		boolean userSession = false;
		boolean userIpAddr = false;
		HttpServletRequest httpRequest = (HttpServletRequest) request;

		if (httpRequest.getSession(false) != null) {
			String sessionId = httpRequest.getSession(false).getId();
			if (sessionId != null && sessionId.length() > 0){
				// To use the sessionId in the log, juste add %X{sessionId} in the layout pattern. 
				// Cast string to object the method MDC.put with param (string,string) is unavailable at runtime
				MDC.put("sessionId", (Object) httpRequest.getSession(false).getId());
				MDC.put("userAgent", (Object) httpRequest.getHeader("User-Agent"));
				String stromaeUrl = getStromaeUrl(httpRequest);
				MDC.put("survey", (Object) getSurvey(stromaeUrl));
				MDC.put("surveyUnit", (Object) getSurveyUnit(stromaeUrl));
				userSession = true;
			}
		}
		String ipAddr = getClientIpAddr(httpRequest);
		if (ipAddr != null && ipAddr.length() > 0){
			MDC.put("ipAddr", (Object) ipAddr);
			userIpAddr = true;
		}

		chain.doFilter(request, response);

		if (userSession) {
			MDC.remove("sessionId");
			MDC.remove("userAgent");
			MDC.remove("survey");
			MDC.remove("surveyUnit");
		}
		if (userIpAddr) MDC.remove("ipAddr");
	}

	@Override
	public void destroy() {
	}

	public static String getClientIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For"); 
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
			ip = request.getHeader("Proxy-Client-IP");  
		}  
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
			ip = request.getHeader("WL-Proxy-Client-IP");  
		}  
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
			ip = request.getHeader("HTTP_CLIENT_IP");  
		}  
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
		}  
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
			ip = request.getRemoteAddr();  
		}  
		return ip;  

	}

	public static String getSurvey(String stromaeUrl) {		
		URL url=null;
		try {
			url = new URL(stromaeUrl);
		} catch (Exception e) {
		}

		List<String> pathSplit = url!=null ? Arrays.asList(url.getPath().split("/")) : Arrays.asList();			
		return pathSplit.size() >=4 ? pathSplit.get(3) : "unknown";


	}

	public static String getSurveyUnit(String stromaeUrl) {
		if (stromaeUrl.contains("unite-enquete")) {
			Matcher matcher = Pattern.compile(".*/new\\?unite-enquete=(((?!\\&).)*).*").matcher(stromaeUrl);
			if(matcher.find()) return matcher.group(1);
		}
		return "unknown";
	}

	public static String getStromaeUrl(HttpServletRequest request) {
		try {
			String urlRequest = request.getRequestURL().toString()+"?"+request.getQueryString();
			if(!urlRequest.contains("unite-enquete")) {
				String refererHeader = request.getHeader("Referer");
				if(refererHeader != null) {
					urlRequest = refererHeader.contains("auth/realms") && refererHeader.contains("redirect_uri=")
							?
									refererHeader.split("redirect_uri=")[1]
											.replaceAll("%2F", "/")
											.replaceAll("%3A", ":")
											.replaceAll("%3D", "=")
											.replaceAll("%3F", "?")
											: 
												refererHeader;
				} 
			}
			
			return urlRequest;
		} catch (Exception e) {
			return "unknown";
		}
	}

}
