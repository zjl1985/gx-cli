package com.xinhai.usermanager.api;

import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.List;

/**
 * @author fanxi
 * @date 2016-4-26
 */
public interface UserService {
  /**
   * 获取用户信息
   *
   * @param id 主键
   * @return 用户信息
   */
  User getUser(String id);
}
