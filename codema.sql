/*
MySQL Data Transfer
Source Host: localhost
Source Database: codema
Target Host: localhost
Target Database: codema
Date: 2014/8/29 18:34:26
*/

SET FOREIGN_KEY_CHECKS=0;
CREATE DATABASE codem;
use codem;
-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT 'user id',
  `tid` int(11) NOT NULL DEFAULT '1' COMMENT 'type id',
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  `isDelete` int(11) NOT NULL DEFAULT '0' COMMENT '0',
  `isPublic` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for blogtype
-- ----------------------------
DROP TABLE IF EXISTS `blogtype`;
CREATE TABLE `blogtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT 'type name',
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `isDelete` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `comment` text NOT NULL,
  `reply` int(11) NOT NULL COMMENT 'reply user',
  `level` int(11) NOT NULL DEFAULT '1',
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  `isDelete` int(11) NOT NULL DEFAULT '0',
  `isPublic` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `gid` int(11) DEFAULT '1',
  `nick` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT 'user',
  `birthday` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `blog` VALUES ('1', '1', '1', 'Hello world', 'Ha Ha', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0');
INSERT INTO `user` VALUES ('1', '1', 'Toby', 'fang.yanliang', '2014-08-08 00:00:00', '2014-08-08 00:00:00', '2014-08-08 00:00:00');
