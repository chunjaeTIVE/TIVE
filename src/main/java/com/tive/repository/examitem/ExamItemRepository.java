package com.tive.repository.examitem;

import com.tive.domain.ExamItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExamItemRepository extends JpaRepository<ExamItem,Long>,ExamItemQueryDSL {
    @Override
    Optional<ExamItem> findById(Long aLong);
}
