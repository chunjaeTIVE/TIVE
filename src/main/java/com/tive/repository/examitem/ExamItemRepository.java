package com.tive.repository.examitem;

import com.tive.domain.ExamItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamItemRepository extends JpaRepository<ExamItem,Long>,ExamItemQueryDSL {

}
