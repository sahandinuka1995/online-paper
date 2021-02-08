package lk.ceyentra.paper.repo;

import lk.ceyentra.paper.dto.StudentDTO;
import lk.ceyentra.paper.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Integer> {
    long count();
    Student findByEmail(String email);
    boolean existsStudentByEmail(String email);
    Student getByEmail(String email);
}
