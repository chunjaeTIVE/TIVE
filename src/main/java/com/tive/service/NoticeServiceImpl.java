package com.tive.service;

import com.tive.domain.Notice;
import com.tive.dto.NoticeDTO;
import com.tive.repository.notice.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService{

    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<NoticeDTO> getNoticeList() {
        List<Notice> noticeList = noticeRepository.findAll();

        List<NoticeDTO> nList = noticeList.stream().map(item->modelMapper.map(item,NoticeDTO.class)).collect(Collectors.toList());

        return nList;
    }
}
