package com.manoj.ecom_proj.config;

import com.manoj.ecom_proj.model.Product;
import com.manoj.ecom_proj.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("Initializing database with sample products...");

                // Product 1: iPhone 14
                Product iphone = new Product();
                iphone.setName("iPhone 14 Pro");
                iphone.setDescription("6.1-inch Super Retina XDR display with ProMotion. A16 Bionic chip for exceptional performance. 48MP camera system with 4K video. All-day battery life.");
                iphone.setBrand("Apple");
                iphone.setPrice(new BigDecimal("999.99"));
                iphone.setCategory("Mobile");
                iphone.setReleaseDate(parseDate("15-09-2022"));
                iphone.setProductAvailable(true);
                iphone.setStockQuantity(50);
                loadImage(iphone, "static/iphone-14.png");
                repository.save(iphone);
                System.out.println("Added iPhone 14 Pro");

                // Product 2: Sony Headphones
                Product headphones = new Product();
                headphones.setName("Sony WH-1000XM5");
                headphones.setDescription("Industry-leading noise cancellation with 30-hour battery life. Crystal-clear calling with beamforming microphones. Multi-device pairing for seamless switching.");
                headphones.setBrand("Sony");
                headphones.setPrice(new BigDecimal("399.99"));
                headphones.setCategory("Headphone");
                headphones.setReleaseDate(parseDate("12-05-2022"));
                headphones.setProductAvailable(true);
                headphones.setStockQuantity(35);
                loadImage(headphones, "static/sony-headphones.png");
                repository.save(headphones);
                System.out.println("Added Sony WH-1000XM5");

                // Product 3: Acer Laptop
                Product laptop = new Product();
                laptop.setName("Acer Aspire 5");
                laptop.setDescription("15.6-inch Full HD display. Intel Core i5, 8GB RAM, 512GB SSD. Intel Iris Xe graphics. Backlit keyboard. Perfect for work and entertainment.");
                laptop.setBrand("Acer");
                laptop.setPrice(new BigDecimal("649.99"));
                laptop.setCategory("Laptop");
                laptop.setReleaseDate(parseDate("20-03-2023"));
                laptop.setProductAvailable(true);
                laptop.setStockQuantity(25);
                loadImage(laptop, "static/acer-laptop.png");
                repository.save(laptop);
                System.out.println("Added Acer Aspire 5");

                // Additional products for variety
                Product samsungTV = new Product();
                samsungTV.setName("Samsung 55\" QLED TV");
                samsungTV.setDescription("Stunning 4K Quantum Dot technology with HDR. Smart TV with streaming apps and voice control. Ultra-thin bezels for immersive viewing.");
                samsungTV.setBrand("Samsung");
                samsungTV.setPrice(new BigDecimal("799.99"));
                samsungTV.setCategory("Electronics");
                samsungTV.setReleaseDate(parseDate("10-01-2023"));
                samsungTV.setProductAvailable(true);
                samsungTV.setStockQuantity(15);
                loadImage(samsungTV, "static/samsung-tv.png");
                repository.save(samsungTV);
                System.out.println("Added Samsung QLED TV");

                Product dellMonitor = new Product();
                dellMonitor.setName("Dell UltraSharp 27\"");
                dellMonitor.setDescription("27-inch QHD monitor with InfinityEdge. 99% sRGB color accuracy. USB-C with 65W power delivery. Adjustable stand with tilt and swivel.");
                dellMonitor.setBrand("Dell");
                dellMonitor.setPrice(new BigDecimal("449.99"));
                dellMonitor.setCategory("Electronics");
                dellMonitor.setReleaseDate(parseDate("05-06-2023"));
                dellMonitor.setProductAvailable(true);
                dellMonitor.setStockQuantity(30);
                loadImage(dellMonitor, "static/dell-monitor.png");
                repository.save(dellMonitor);
                System.out.println("Added Dell UltraSharp Monitor");

                Product logitechMouse = new Product();
                logitechMouse.setName("Logitech MX Master 3S");
                logitechMouse.setDescription("Wireless mouse with ultra-fast scrolling and quiet clicks. 8K DPI precision. Multi-device connectivity. Ergonomic design with 70-day battery.");
                logitechMouse.setBrand("Logitech");
                logitechMouse.setPrice(new BigDecimal("99.99"));
                logitechMouse.setCategory("Electronics");
                logitechMouse.setReleaseDate(parseDate("15-08-2023"));
                logitechMouse.setProductAvailable(false);
                logitechMouse.setStockQuantity(0);
                loadImage(logitechMouse, "static/logitech-mouse.png");
                repository.save(logitechMouse);
                System.out.println("Added Logitech MX Master 3S");

                System.out.println("Database initialization completed successfully!");
            } else {
                System.out.println("Database already contains products. Skipping initialization.");
            }
        };
    }

    private void loadImage(Product product, String imagePath) {
        try {
            ClassPathResource resource = new ClassPathResource(imagePath);
            byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());
            product.setImageData(imageBytes);
            product.setImageName(resource.getFilename());
            product.setImageType("image/png");
        } catch (IOException e) {
            System.err.println("Failed to load image: " + imagePath);
            e.printStackTrace();
        }
    }

    private Date parseDate(String dateStr) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
            return sdf.parse(dateStr);
        } catch (Exception e) {
            return new Date();
        }
    }
}
