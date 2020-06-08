<template> 
  <div>
    <b>Plej.link:</b>
    <input type="text" name="link" :value="user.linkToken" disabled>
    <button v-on:click="generateLinkToken">Generate New Link</button>
  </div>
</template>