package lk.ceyentra.paper.repo;

import lk.ceyentra.paper.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Question, Integer> {

    List<Question> getAllByPaperPid(int id);

    long count();
}
