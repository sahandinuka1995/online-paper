package lk.ceyentra.paper.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonIgnoreProperties(value = {"question"}, allowGetters = false, allowSetters = true)
public class AnswerDTO {
    private int aid;
    private String answer;
    private String canswer;

    private QuestionDTO question;
}
