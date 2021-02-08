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
public class Question {
    @Id
    private int qid;
    private String ques;

    @ManyToOne
    @JoinColumn(name = "paperId", referencedColumnName = "pid", nullable = false)
    private Paper paper;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answer;
}
