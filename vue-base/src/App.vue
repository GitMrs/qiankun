<template>
  <div id="app">
    <div id="nav">
      <el-menu mode="horizontal" :router="true">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/vue">Vue</el-menu-item>
        <el-menu-item index="/react">react</el-menu-item>
      </el-menu>
    </div>
    <div>
      <router-view />
      <div id="vue"></div>
      <div id="react"></div>
    </div>
  </div>
</template>

<style>
</style>
