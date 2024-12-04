package com.example.demo;

import java.util.Random;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
@SpringBootApplication
public class DemoApplication {
    @Value("${spring.redis.host:localhost}")  // Default to localhost SPRING_REDIS_HOST
    private String redisHost;

    @Value("${spring.redis.port:6379}")    // Default to 6379 SPRING_REDIS_PORT
    private int redisPort;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    LettuceConnectionFactory redisConnectionFactory() {
        // You would need to externalize these values, best practice not to hardcode them
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(redisHost, redisPort);
        return new LettuceConnectionFactory(config);
    }

    @Bean
    RedisTemplate<String, String> redisTemplate(LettuceConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer()); // Or appropriate serializer based on your list elements
        return template;
    }    

}

@RestController
class HelloController {
    private final RedisTemplate<String, String> redisTemplate; // Inject the redis template
    private final String redisListName;

    public HelloController(RedisTemplate<String, String> redisTemplate, @Value("${KEY:redis-list}") String redisListName) { //Constructor injection
        this.redisTemplate = redisTemplate;
        this.redisListName = redisListName;
    }

    @GetMapping("/delete")
    public String delete() { 
        return redisTemplate.delete(redisListName).toString();
    }

    @GetMapping("/getSize")
    public String getSize() { 
        return redisTemplate.opsForList().size(redisListName).toString();
    }
    @GetMapping("/addToList")
    public String addToList() { 
        Random random = new Random();
        String randomValue = String.valueOf(random.nextInt());
        redisTemplate.opsForList().rightPush(redisListName, randomValue);
        return "Added " + randomValue + " to the list";
    }
    @GetMapping("/")
    public String home() {
        return "Hello Docker World 4";
    }
    //@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/hi")
    public String hi() {
        return "hi";
    }    

    @GetMapping("/bye")
    public String bye() {
        return "bye";
    }       
    @GetMapping("/code")
    public String code() {
        throw new RuntimeException("Error");
    }          
}
