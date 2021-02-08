package lk.ceyentra.paper.service.impl;

import lk.ceyentra.paper.dto.QuestionDTO;
import lk.ceyentra.paper.entity.Question;
import lk.ceyentra.paper.repo.QuestionRepo;
import lk.ceyentra.paper.service.QuestionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveQuestion(QuestionDTO dto) {
        if (!repo.existsById(dto.getQid())){
            Question map = mapper.map(dto, Question.class);
            repo.save(map);
        }else {
            throw new RuntimeException("Question already exist");
        }
    }
}
