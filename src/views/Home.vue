<template>
    <div class="friends">
	<ul>
	    <li v-for="onlineFriend in onlineFriends" class="online">
		<p> {{ onlineFriend }} </p>
	    </li>
	    <li v-for="offlineFriend in offlineFriends" class="offline">
		<p> {{ offlineFriend }} </p>
	    </li>
	</ul>
    </div>

    <div class="footer">
	<ul class="chat-windows">
	    <li v-for="window in chatWindows">
		<div class="history-box">
		    <p> {{ window.name }} </p>
		    <ul class="messages">
			<li v-for="(message, index) in window.messages">
			    <p><span> {{ window.messages[index].timestamp }} </span> {{ message }} </p>
			</li>
		    </ul>
		</div>
		<div class="message-box">
		    <input @click="sendMessage" type="text" placeholder="Type a message." />
		    <button> Send </button>
		</div>
	    </li>
	</ul>
    </div>
</template>

<script>
 export default {
     data() {
	 return {
	     onlineFriends: [],
	     offlineFriends: [],
	     chatWindows: []
	 }
     },

     methods: {
	 setFriendOnlineStatus(friend, onlineFlag) {
	     if(this.onlineFriends.includes(friend))
		 this.onlineFriends.splice(this.onlineFriends.indexOf(friend), 1);

	     if(this.offlineFriends.includes(friend))
		 this.offlineFriends.splice(this.offlineFriends.indexOf(friend), 1);
	     
	     if(onlineFlag) {
		 this.onlineFriends.push(friend);
	     } else {
		 this.offlineFriends.push(friend);
	     }
	 }
     },

     computed: {
	 
     },
     
     beforeMount() {
	 this.$store.dispatch('setupChatServerConn');
     }
 }
</script>

<style scoped lang="scss">

</style>
