package com.tive.repository.questionitem;

import com.tive.domain.QuestionItem;
import com.tive.dto.QuestionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface QuestionItemRepository extends JpaRepository<QuestionItem,Long> , QuestionItemQueryDSL {
    @Query(" select q from QuestionItem q where q.questionToExam.eid=:eid and (q.status is null or q.status <>99) ")
    List<QuestionItem> findAnswer(long eid);

}
