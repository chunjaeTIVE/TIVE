package com.tive.service;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

@Getter
@NoArgsConstructor
public class Marking {
    public static String[] stringAnswer(String uqid, String userStringAns, String qanswer){
        System.out.println(uqid + " : " + userStringAns + "," + qanswer);
        System.out.println(qanswer.contains(userStringAns));
        String correct = "0";
        if(qanswer.contains(userStringAns))
            correct = "1";
        return new String[]{userStringAns, correct};
    }
    public static String[] listAnswer(String uqid, HashMap<String, Object> stringObjectHashMap
            , String type, List<String> userListAns, String qanswer){
        System.out.println(uqid + ", " + userListAns.get(0) + ", " + qanswer);
        List<Object> realListAns = (List<Object>) stringObjectHashMap.get(type);
        StringBuilder userAnswer = new StringBuilder();
        String correct = "1";
        if(realListAns.size()!= userListAns.size()){
            for(int u=0; u<userListAns.size(); u++){
                if(realListAns.get(0) instanceof String){
                    String realAns = (String)realListAns.get(u);
                    System.out.println(realAns.contains(userListAns.get(u)));
                } else {
                    Integer realAns = (Integer) realListAns.get(u);
                    System.out.println(realAns==Integer.parseInt(userListAns.get(u)));
                }
                userAnswer.append(userListAns.get(u)+",");
            }
            correct = "0";
        } else {
            for (int i = 0; i < realListAns.size(); i++) {
                if(realListAns.get(0) instanceof String){
                    String realAns = (String)realListAns.get(i);
                    System.out.println(realAns.contains(userListAns.get(i)));
                    userAnswer.append(userListAns.get(i) + ",");
                    if(!realAns.contains(userListAns.get(i)))
                        correct = "0";
                } else {
                    Integer realAns = (Integer) realListAns.get(i);
                    System.out.println(realAns==Integer.parseInt(userListAns.get(i)));
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
        System.out.println(uqid + ", " + userListAns.get(0) + ", " + qanswer);
        List<String> realListAns = (List<String>) stringObjectHashMap.get("answer");
        StringBuilder userAnswer = new StringBuilder();
        String correct = "1";
        userListAns.sort(Comparator.comparingInt(list-> Integer.parseInt(list.get(0))));
        for(int i=0; i<realListAns.size(); i++){
            //System.out.println(userListAns.get(i).get(0)+", "+userListAns.get(i).get(1));
            String realAns = realListAns.get(i);
            // realans 의 idx 와 userans 의 0번째가 같고, realans 의 idx 에 해당하는 값에 userans 의 1번째를 포함하고 있으면 정답
            String idx = userListAns.get(i).get(0);
            String ans = userListAns.get(i).get(1);
            //System.out.println(Integer.parseInt(idx)==i+1);
            if(ans.contains("https")){
                String path = ans.split("/")[ans.split("/").length-1];
                System.out.println(realAns.contains(path));
                userAnswer.append("<img src=\""+ans+"\" alt=\""+"user_answer_img\">,");
                if(!realAns.contains(path))
                    correct = "0";
            } else {
                System.out.println(realAns.contains(ans));
                userAnswer.append(ans+",");
                if(!realAns.contains(ans))
                    correct = "0";
            }
        }
        return new String[]{userAnswer.toString(),correct};

    }

}
