package fr.insee.stromae.logging;

import java.util.Arrays;
import java.util.List;
import java.util.logging.Filter;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.regex.Pattern;



/**
 * Log4j filter allowing to filter log messages according to a pattern 
 * in the context of paradata exploitation. 
 * This filter can be activated by adding <filter class="fr.insee.stroame.logging.CustomFilterParadata" /> 
 * in the appender's conf
 * @author Benjamin Bour
 */
public class CustomFilterParadata implements Filter {
	
	public static String orbeonEvent = "(DOMActivate|xforms-focus|xxforms-value)";
	public static String orbeonSource = "(setvalue|client|select)";
	public static String blackListTargetFocusOut = "(corpsSection|fr-view-component|fr-form-group|fr-view)";
	
	public static List<String> whiteListPattern = Arrays.asList(
			".*start handling external event \\{target id: \".*\", event name: \""+orbeonEvent+"\"\\}",
			".*optimized dispatching \\{name: \"DOMFocusOut\", target: \"((?!"+blackListTargetFocusOut+").)*\", native handlers called: \"0\"\\}",
			".*xf:setvalue - setting instance value \\{source: \""+orbeonSource+"\", old value: \".*\", new value: \".*\", instance: \"fr-form-instance\"\\}.*",
			".*event: \\{\"request\": \".*\", \"session\": \".*\", \"source\": \"limiter\", \"message\": \".*\", \"path\": \"/exporter/.*/.*\", \"method\": \"GET\"\\}",
			".*event: \\{\"request\": \".*\", \"session\": \".*\", \"source\": \"xforms\", \"message\": \"new form session\",.*",
			".*start dispatching \\{name: \"xforms-invalid\", target: \".*\"\\}");

	/**
	 * Filter decision rule
	 */
	@Override
	public boolean isLoggable(LogRecord record) {
		Level logLevel = record.getLevel();
		String msg = record.getMessage();
		return logLevel == Level.SEVERE  || isAccepted(msg);
	}

	public static boolean isAccepted(String message) {
		for(String pattern : whiteListPattern) {
			if(Pattern.matches(pattern, message)) return true;
		}
		return false;
	}


}
