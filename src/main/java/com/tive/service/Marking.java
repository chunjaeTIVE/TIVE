package com.tive.service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

@Getter
@NoArgsConstructor
@Slf4j
public class Marking {
    public static String[] stringAnswer(String uqid, String userStringAns, String qanswer){
        log.info("uqid, useranswer, realanswer...{},{},{}",uqid,userStringAns,qanswer);
        log.info("채점 결과...{}",qanswer.contains(userStringAns));
        String correct = "0";
        if(qanswer.contains(userStringAns))
            correct = "1";
        return new String[]{userStringAns, correct};
    }
    public static String[] listAnswer(String uqid, HashMap<String, Object> stringObjectHashMap
            , String type, List<String> userListAns, String qanswer){
        log.info("uqid,useranswer(0),realanswer...{},{},{}",uqid,userListAns.get(0),qanswer);
        List<Object> realListAns = (List<Object>) stringObjectHashMap.get(type);
        StringBuilder userAnswer = new StringBuilder();
        String correct = "1";
        if(realListAns.size() != userListAns.size()){
            for(int u=0; u<userListAns.size(); u++){
//                if(realListAns.get(0) instanceof String){
//                    String realAns = (String)realListAns.get(u);
//                    log.info("채점 결과 {} ...{}",u,realAns.contains(userListAns.get(u)));
//                } else {
//                    Integer realAns = (Integer) realListAns.get(u);
//                    log.info("채점 결과{},...{}",u,realAns==Integer.parseInt(userListAns.get(u)));
//                }
                userAnswer.append(userListAns.get(u)+",");
            }
            correct = "0";
        } else {
            for (int i = 0; i < realListAns.size(); i++) {
                if(realListAns.get(0) instanceof String){
                    String realAns = (String)realListAns.get(i);
                    log.info("채점 결과 {}...{}",i,realAns.contains(userListAns.get(i)));
                    userAnswer.append(userListAns.get(i) + ",");
                    if(!realAns.contains(userListAns.get(i)))
                        correct = "0";
                } else {
                    Integer realAns = (Integer) realListAns.get(i);
                    log.info("채점 결과 {}...{}",i,realAns==Integer.parseInt(userListAns.get(i)));
                    userAnswer.append(userListAns.get(i) + ",");
                    if(realAns!=Integer.parseInt(userListAns.get(i)))
                        correct = "0";
                }
            }
        }
        return new String[]{userAnswer.toString(),correct};
    }
    public static String[] dragDropAnswer(String uqid, HashMap<String, Object> stringObjectHashMap
            , List<List<String>> userListAns, String qanswer){
        log.info("uqid,useranswer,realanswer...{},{},{}",uqid,userListAns.get(0),qanswer);
        List<String> realListAns = (List<String>) stringObjectHashMap.get("answer");
        StringBuilder userAnswer = new StringBuilder();
        String correct = "1";
        userListAns.sort(Comparator.comparingInt(list-> Integer.parseInt(list.get(0))));
        if(realListAns.size()!= userListAns.size()){
            for(int u=0; u<userListAns.size(); u++){
                //String realAns = realListAns.get(u);
                String ans = userListAns.get(u).get(1);
                if(ans.contains("https")){
                    //String path = ans.split("/")[ans.split("/").length-1];
                    //log.info("채점결과...{}",realAns.contains(path));
                    userAnswer.append("<img src=\""+ans+"\" alt=\""+"user_answer_img\">,");
                } else {
                    //log.info("채점결과...{}",realAns.contains(ans));
                    userAnswer.append(ans+",");
                }
            }
            correct = "0";
        } else {
            for(int i=0; i<realListAns.size(); i++){
                //System.out.println(userListAns.get(i).get(0)+", "+userListAns.get(i).get(1));
                String realAns = realListAns.get(i);
                // realans 의 idx 와 userans 의 0번째가 같고, realans 의 idx 에 해당하는 값에 userans 의 1번째를 포함하고 있으면 정답
                //String idx = userListAns.get(i).get(0);
                String ans = userListAns.get(i).get(1);
                //System.out.println(Integer.parseInt(idx)==i+1);
                if(ans.contains("https")){
                    String path = ans.split("/")[ans.split("/").length-1];
                    log.info("채점결과...{}",realAns.contains(path));
                    userAnswer.append("<img src=\""+ans+"\" alt=\""+"user_answer_img\">,");
                    if(!realAns.contains(path))
                        correct = "0";
                } else {
                    log.info("채점결과...{}",realAns.contains(ans));
                    userAnswer.append(ans+",");
                    if(!realAns.contains(ans))
                        correct = "0";
                }
            }
        }

        return new String[]{userAnswer.toString(),correct};

    }

}
