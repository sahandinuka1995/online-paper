package lk.ceyentra.paper.service.impl;

import lk.ceyentra.paper.dto.AnswerDTO;
import lk.ceyentra.paper.entity.Answer;
import lk.ceyentra.paper.repo.AnswerRepo;
import lk.ceyentra.paper.service.AnswerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    AnswerRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveAnswer(AnswerDTO[] dto) {
        for (AnswerDTO answer : dto) {
            Answer map = mapper.map(answer, Answer.class);
            repo.save(map);
        }
    }
}
