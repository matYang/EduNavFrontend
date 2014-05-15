<script type="text/template" id="tpl_Edit">
	<div id = 'edit_requirement'>
	  <form id='edit_info'>
	    <div id='edit_myInfo'>
	      <div id='edit_myGender'>
	        <div class='edit_label'>我需要</div>
	        <input name='gender' type='radio' value='male'/>男
	        <input name='gender' type='radio' value='female'/>女
	        <input name='gender' type='radio' value='both'/>无所谓
	      </div>
	      <div id='edit_myLocation'>
	        <div class='edit_label'>我的地区在</div>
	        <input name='location' type='text' />
	      </div>
	      <div id='edit_mySchool'>
	        <div class='edit_label'>学校是</div>
	        <input name='school' type='text' />
	      </div>
	      <div id='edit_myDetail'>
	        <div class='edit_label'>其他信息</div>
	        <textarea name='detail' type='text' ></textarea>
	      </div>
	    </div>
	    <div class='publish_time_container_wrapper'>
	      <div id='publish_time_container'>

	      </div>
	      <div id = 'publish_back' class='button'>
	        放弃修改
	      </div>
	      <div id = 'publish_finish' class='button'>
	        修改完成
	      </div>
	    </div>
	  </form>
	</div>
</script>



<script type="text/template" id="tpl_Front">
	<div id = 'frontBox_<%= messageId %>' class = 'frontBoxContainer'>
		 <div id = 'profilePicture_<%= messageId %>' class = 'searchResultProfilePicture front'></div>
	  <div id = 'searchResultContainerInfo_<%= messageId %>' class = 'searchResultContainerInfo front'>
	      <div class = 'searchResultSchoolName'><%= location.university %></div>	
	      <div class = 'searchResultDate'><%= simple_date %></div>
	      <div class = 'searchResultTime'><%= simple_timeRange %></div>
	      <div class = 'searchResultPublishTime'><%= creationTime %></div>
	    <div class = 'searchResultGender'><%= genderRequirement %></div>
	    <div class = 'searchResultUserName'><%= ownerName %></div>
	    <div class = 'searchResultUserLevel'><%= ownerLevel %></div>
	    <div class = 'searchResultFollowNote'>关注</div>
	    <div class = 'searchResultFollowUserName'><%= ownerName %></div>
	  </div>
	  <div id = 'searchResultContainerFollow_<%= messageId %>' class = 'searchResultContainerFollow'>
	    <div class = 'searchResultFollow'>关注</div>	
	    <div class = 'searchResultFollowLogo'>+1</div>
	  </div>
	  <div id = 'searchResultContainerPrice_<%= messageId %>' class='searchResultContainerPrice'>
	    <div class = 'searchResultPriceLogo'>￥</div>
	           <div class = 'searchResultPrice'><%= price %></div>
	           <div class = 'searchResultDuration'><%= simple_duration %></div>
	    <!--TODO: rename this-->
	    <div class = 'searchResultPaymentPerHour1'>每小时</div>
	            <div class = 'searchResultPaymentPerHour2'><%= simple_hourlyRate %></div>
	    <div class = 'searchResultPaymentPerHour3'>元</div>
	  </div>

	</div>
</script>



<script type="text/template" id="tpl_Transaction">
	<div id = "transaction_content_<%= transactionId %>" class = "transaction_content">
	<div id="transaction_image_<%= transactionId %>" class="transaction_image">
	  <img src="" />
	</div>
	<div class="transaction_text">
	  <% if (customer.name) { %>
	  	<%= customer.name %>
	  <% } else { %>
	  乘客A
	  <% } %>
	  于<%= creationTime %>预定了<%= departure_seatsBooked %>个座位
	</div>
	</div>
</script>