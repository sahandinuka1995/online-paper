package lk.ceyentra.paper.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int aid;
    private String answer;
    private String canswer;

    @ManyToOne
    @JoinColumn(name = "questionid", referencedColumnName = "qid", nullable = false)
    private Question question;
}
