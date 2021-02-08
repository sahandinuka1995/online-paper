package lk.ceyentra.paper.service.impl;

import lk.ceyentra.paper.dto.*;
import lk.ceyentra.paper.entity.*;
import lk.ceyentra.paper.repo.*;
import lk.ceyentra.paper.service.StudentService;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepo repo;

    @Autowired
    StudentResultRepo studentResultRepo;

    @Autowired
    AnswerRepo answerRepo;

    @Autowired
    QuestionRepo questionRepo;

    @Autowired
    PaperRepo paperRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveStudent(StudentDTO dto) {
        if (!repo.existsStudentByEmail(dto.getEmail())) {
            Student map = mapper.map(dto, Student.class);
            repo.save(map);
        }
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> all = repo.findAll();
        return mapper.map(all, new TypeToken<List<StudentDTO>>() {
        }.getType());
    }

    @Override
    public void saveStudentResult(StudentResultDTO dto) {
        if (repo.existsStudentByEmail(dto.getEmail())) {
            Student byEmail = repo.findByEmail(dto.getEmail());

            if(!studentResultRepo.existsByStid(byEmail.getId())){
                for (StudentAnswersDTO a : dto.getAnswers()) {
                    StudentResult studentResult = new StudentResult(byEmail.getId(), dto.getPid(), a.getQid(), a.getAid());
                    studentResultRepo.save(studentResult);
                }
            }else{
                throw new RuntimeException("You already submitted this paper");
            }


        }
    }


    @Override
    public List<StudentDTO> getCorrectAnswers(int pid) {
        List<TmpModel> list = new ArrayList<>();
        Paper paper = paperRepo.getPaperByPid(pid);
        List<Question> question = paper.getQuestion();
        List<Student> student = repo.findAll();
        for (Question ques : question) {
            //System.out.println(ques.getQid());
            for (Answer answer : ques.getAnswer()) {
                if (answer.getCanswer().equals("true")) {
                    // System.out.println("==> "+answer.getAid()+" "+answer.getCanswer());
                    list.add(new TmpModel(ques.getQid(), answer.getAid()));
                }
            }
        }

        List<StudentDTO> stlist = new ArrayList<>();

        for (Student std : student) {
            int marks = 0;
            List<StudentResult> stdResult = studentResultRepo.getAllByStidAndPid(std.getId(), pid);
            for (TmpModel model : list) {
                //System.out.println("teacher " + model.getQid() + " " + model.getAid());
                for (StudentResult r : stdResult) {
                    //System.out.println("student " + r.getQid() + " " + r.getAid());
                    if (model.getQid() == r.getQid()) {
                        if (model.getAid() == r.getAid()) {
                            //                 System.out.println(std.getEmail()+" "+pid+" "+r.getQid()+" "+r.getAid());
                            marks++;
                        }
                    }
                }
            }
            //System.out.println(std.getEmail() + "marks per student " + marks);
            stlist.add(new StudentDTO(std.getId(), std.getEmail(), std.getName(), marks));
        }
        return stlist;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    class TmpModel {
        private int qid;
        private int aid;

    }
}
