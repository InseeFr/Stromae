package fr.insee.stromae.logging;

import org.junit.Assert;
import org.junit.Test;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TestPattern {
	
	@Test
	public void simpleTest() {
		String test1 = "2020-07-20 10:38:15,342 DEBUG XFormsServer - sessionId:E0C986900CC3343044901C10928A836F ipAddr:99.99.999.999 userAgent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 -   start handling external event {target id: \"go-to-first-page\", event name: \"xforms-focus\"}";
		String test2 = "2020-07-20 10:38:23,905 DEBUG XFormsServer - sessionId:E0C986900CC3343044901C10928A836F ipAddr:99.99.999.999 userAgent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 -                               xf:setvalue - setting instance value {source: \"setvalue\", old value: \"10-07-2020 à 18:22\", new value: \"20-07-2020 à 10:38\", instance: \"fr-form-instance\"}";
		String test4 = "2020-07-20 10:38:23,905 DEBUG XFormsServer - sessionId:E0C986900CC3343044901C10928A836F ipAddr:99.99.999.999 userAgent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 -                                 start handler {name: \"xxforms-value-changed\", phase: \"target\", observer: \"fr-form-instance\"}";
		String test5 = "2020-07-20 10:38:24,020 DEBUG XFormsServer - sessionId:E0C986900CC3343044901C10928A836F ipAddr:99.99.999.999 userAgent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 -                                   optimized dispatching {name: \"DOMFocusOut\", target: \"FIN-control≡messageConfirmation\", native handlers called: \"0\"}";
		
		Assert.assertTrue(CustomFilterParadata.isAccepted(test1));
		Assert.assertTrue(CustomFilterParadata.isAccepted(test2));
		Assert.assertFalse(CustomFilterParadata.isAccepted(test4));
		Assert.assertTrue(CustomFilterParadata.isAccepted(test5));
	}
	
	@Test
	public void testPattern() {
		String urlRequest = "https://stroame.insee.fr/questionnaire/fr/test-2019-x00/v1/new?unite-enquete=TEST0000001";
		String urlRequest2 = "https://stroame.insee.fr/questionnaire/fr/test-2019-x00/v1/new?unite-enquete=TEST0000002&state=21e8ab1d-e5d8-48ac-ab80-546ea01801e7&login=true&scope=openid";
		Matcher matcher = Pattern.compile(".*/new\\?unite-enquete=(((?!\\&).)*).*").matcher(urlRequest);matcher.find();
		Matcher matcher2 = Pattern.compile(".*/new\\?unite-enquete=(((?!\\&).)*).*").matcher(urlRequest2);matcher2.find();
		Assert.assertEquals("TEST0000001",matcher.group(1));
		Assert.assertEquals("TEST0000002",matcher2.group(1));
	}

}
