package lk.ceyentra.paper.repo;

import lk.ceyentra.paper.entity.Answer;
import lk.ceyentra.paper.entity.Paper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepo extends JpaRepository<Answer, Integer> {
    List<Answer> getAllByAid(int id);
}
