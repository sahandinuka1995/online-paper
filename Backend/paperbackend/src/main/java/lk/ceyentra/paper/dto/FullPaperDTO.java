package lk.ceyentra.paper.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;



@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FullPaperDTO {
    private int paperId;
    private List<QuestionDTO> listOfQuestionsAndAnswers;

}
