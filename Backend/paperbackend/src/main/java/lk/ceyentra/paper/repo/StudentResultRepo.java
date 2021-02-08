package lk.ceyentra.paper.repo;

import lk.ceyentra.paper.dto.StudentResultDTO;
import lk.ceyentra.paper.entity.StudentResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentResultRepo extends JpaRepository<StudentResult, Integer> {
    List<StudentResult> getAllByStidAndPid(int sid, int pid);

    List<StudentResult> getAllByStid(int id);

    boolean existsByStid(int id);
}
