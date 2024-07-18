package com.tive.repository.report;

import com.tive.domain.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<UserAnswer, Long>, ReportQueryDSL {


}
