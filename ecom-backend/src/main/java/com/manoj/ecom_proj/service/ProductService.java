package com.manoj.ecom_proj.service;
import com.manoj.ecom_proj.model.Product;
import com.manoj.ecom_proj.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository repository;

    public List<Product> getAllProducts(){
        return repository.findAll();
    }


    public Product getProductById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile file) throws IOException {
        product.setImageName(file.getOriginalFilename());
        product.setImageType(file.getContentType());
        product.setImageData(file.getBytes());
        return repository.save(product);
    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        Product product1 = repository.findById(id).orElse(null);
        if(product1 != null) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
            return repository.save(product);
        }
        return null;
    }

    public void deleteProduct(int id) {
        repository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return repository.searchProducts(keyword);
    }
}
