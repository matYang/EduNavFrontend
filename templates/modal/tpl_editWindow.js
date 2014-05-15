<script type="text/template" id="tpl_genderEditWindow">
	<div id='overlay'>
	  <div class='editWindow genderEditWindow hidden'>
	    <div class='editContentWrapper genderEditWindow'>
	      <div class='editContent genderEditWindow'>
	        <div id = 'editGender'>
	          <div class='input_block'>
	            <input type='radio' name='gender' value='male'/>男生
	          </div>
	          <div class='input_block'>
	            <input type='radio' name='gender' value='female'/>女生
	          </div>
	          <div class='input_block'>
	            <input type='radio' name='gender' value='other'/>无所谓
	          </div>
	        </div>
	      </div>
	    </div>
	    <div class = 'editButtonWrapper'>
	      <div class='editCancel button'>返回</div>
	      <div class='editSave button'>保存修改</div>
	    </div>
	  </div>
	</div>

</script>


<script type="text/template" id="tpl_hourRateEditWindow">
	<div id='overlay'>
	  <div class='editWindow hourRateEditWindow hidden'>
	    <div class='editContentWrapper hourRateEditWindow'>
	      <div class='editContent hourRateEditWindow'>
	        <div id = 'editHourRate'>
	          每小时我收取 ￥ <input type='text'/>
	        </div>
	      </div>
	    </div>
	    <div class = 'editButtonWrapper'>
	      <div class='editCancel button'>返回</div>
	      <div class='editSave button'>保存修改</div>
	    </div>
	  </div>
	</div>
</script>



<script type="text/template" id="tpl_timeDateEditWindow">
	<div id='overlay'>
	  <div class='editWindow timeDateEditWindow '>
	    <div class='editContentWrapper timeDateEditWindow'>
	      <div class='editContent timeDateEditWindow'>
	        <div id = 'editTimeDate'>
	          上课日期 <input type='text' name='date'/><br />
	          上课时间 <input type='text' name='time'/><br />
	          课堂持续 <input type='text' name='duration'/><br />
	        </div>
	      </div>
	    </div>
	    <div class = 'editButtonWrapper'>
	      <div class='editCancel button'>返回</div>
	      <div class='editSave button'>保存修改</div>
	    </div>
	  </div>
	</div>
</script>