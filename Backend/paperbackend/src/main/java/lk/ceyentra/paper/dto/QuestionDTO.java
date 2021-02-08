package lk.ceyentra.paper.dto;

import lk.ceyentra.paper.entity.Answer;
import lk.ceyentra.paper.entity.Paper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class QuestionDTO {
    private int qid;
    private String ques;
    private List<AnswerDTO> answers;
    private PaperDTO paper;

    public QuestionDTO(int qid, String ques, List<AnswerDTO> answers, PaperDTO paper) {
        this.qid = qid;
        this.ques = ques;
        this.answers = answers;
        this.paper = paper;
    }
}
