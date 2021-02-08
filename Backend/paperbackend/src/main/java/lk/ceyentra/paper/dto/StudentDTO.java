package lk.ceyentra.paper.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonIgnoreProperties(value = {"studentmark"}, allowGetters = true, allowSetters = false)
public class StudentDTO {
    private int id;
    private String email;
    private String name;
    private int studentmark;

    public StudentDTO(String email, String name) {
        this.email = email;
        this.name = name;
    }
}
