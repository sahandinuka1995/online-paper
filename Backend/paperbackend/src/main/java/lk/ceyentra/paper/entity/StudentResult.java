package lk.ceyentra.paper.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class StudentResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int stid;
    private int pid;
    private int qid;
    private int aid;

    public StudentResult(int stid, int pid, int qid, int aid) {
        this.stid = stid;
        this.pid = pid;
        this.qid = qid;
        this.aid = aid;
    }
}
