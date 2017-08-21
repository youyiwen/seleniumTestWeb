package com.ciic.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SeleniumApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeleniumApplication.class, args);
	}

//	@Bean
//	public EmbeddedServletContainerCustomizer containerCustomizer(){
//		return new EmbeddedServletContainerCustomizer() {
//			@Override
//			public void customize(ConfigurableEmbeddedServletContainer Container) {
//				Container.setSessionTimeout(60*60);//单位为S
//			}
//		};
//	}
}


