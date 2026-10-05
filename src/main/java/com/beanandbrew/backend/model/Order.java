package com.beanandbrew.backend.model;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "Orders")
public class Order {
   
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String item;

    private double total;

    public Order(){}

    public Order(String item,double total){
        this.item=item;
        this.total=total;   
    }
    public Long getId(){return id;};
    public void setId(Long id){this.id=id;}

    public String getItem(){return item;}
    public void setItem(String item){this.item=item;}

    public double getTotal(){return total;}
    public void setTotal(double total){this.total=total;}
}
