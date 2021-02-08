package lk.ceyentra.paper.repo;

import lk.ceyentra.paper.entity.Paper;
import lk.ceyentra.paper.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaperRepo extends JpaRepository<Paper, Integer> {

//    @Query(value = "select p.pid,p.duration,p.name,q.ques,a.answer,a.canswer from  Paper p join Question q  on p.pid=q.paperId join Answer a on q.qid=a.questionid where p.pid=?", nativeQuery = true)
//    List<Object> getFullPaper(int id);

    Paper getPaperByPid(int id);

    long count();
}
