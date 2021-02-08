package lk.ceyentra.paper.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Paper {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int pid;
    private String name;
    private String duration;
    private int noofq;

    @OneToMany(mappedBy = "paper", cascade = CascadeType.ALL)
    private List<Question> question;
}
