package lk.ceyentra.paper.service.impl;

import lk.ceyentra.paper.dto.*;
import lk.ceyentra.paper.entity.Answer;
import lk.ceyentra.paper.entity.Paper;
import lk.ceyentra.paper.entity.Question;
import lk.ceyentra.paper.entity.Student;
import lk.ceyentra.paper.repo.AnswerRepo;
import lk.ceyentra.paper.repo.PaperRepo;
import lk.ceyentra.paper.repo.QuestionRepo;
import lk.ceyentra.paper.service.PaperService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PaperServiceImpl implements PaperService {

    @Autowired
    PaperRepo paperRepo;

    @Autowired
    QuestionRepo questionRepo;

    @Autowired
    AnswerRepo answerRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void savePaper(PaperDTO dto) {
        if (!paperRepo.existsById(dto.getPid())) {
            Paper map = mapper.map(dto, Paper.class);
            paperRepo.save(map);
        } else {
            throw new RuntimeException("Paper already exist");
        }
    }

    @Override
    public List<PaperDTO> getAllPapers() {
        List<Paper> all = paperRepo.findAll();
        return mapper.map(all, new TypeToken<List<PaperDTO>>(){}.getType());
    }

    @Override
    public FullPaperDTO getFullPaper(int id) {
        Paper paper = paperRepo.getOne(id);
        List<Question> questionList = questionRepo.getAllByPaperPid(id);
        System.out.println("Obtained the paaper and the question list");

        FullPaperDTO fullPaperDTO = new FullPaperDTO();
        fullPaperDTO.setPaperId(id);


        ArrayList<QuestionDTO> questionDTOList = new ArrayList<>();

        for(Question q: questionList){
            PaperDTO map = mapper.map(q.getPaper(), PaperDTO.class);
            System.out.println("Mapped paperdto to the paper - after");
            ArrayList<AnswerDTO> answerDTOS = new ArrayList<>();

            List<AnswerDTO> map1 = mapper.map(q.getAnswer(), new TypeToken<List<AnswerDTO>>() {
            }.getType());
            System.out.println("Papaerservice imp insdie get full aper after trhe mapping");
            questionDTOList.add(new QuestionDTO(q.getQid(),q.getQues(),map1,map));
        }



        fullPaperDTO.setListOfQuestionsAndAnswers(questionDTOList);
        return fullPaperDTO;
    }
}
