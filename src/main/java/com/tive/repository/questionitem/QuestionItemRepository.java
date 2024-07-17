package com.tive.repository.questionitem;

import com.tive.domain.QuestionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionItemRepository extends JpaRepository<QuestionItem,Long> , QuestionItemQueryDSL {
}
