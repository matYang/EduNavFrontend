<script type="text/template" id="tpl_locationPicker">
	<div class='popupPanel' id='locationSearchPanel'>
		<div id='popupBoxLocation'>
		<div class='popUpCloseButton' id='location-modal-closeButton'></div>
		<div id='location-modal-titleContainer'><p>请选择城市</p>
			</div>
			<div id='location-modal-provinceContainer'></div>
			<div id='location-modal-cityContainer'></div>
			<div id='location-modal-customizeContainer'></div>
		</div>
	</div>	
</script>


<script type="text/template" id="tpl_locationEditWindow">
	<div id='overlay'>
	  <div class='editWindow locationEditWindow hidden'>
	    <div class='editContentWrapper locationEditWindow hidden'>
	      <div class='editContent locationEditWindow'>
	        <div id = 'editLocation'>
	          <div class='input_block'>
	            我的地区在 <input type='text' name='city'/>
	          </div>
	          <div class='input_block'>
	            学校是 <input type='text' name='school'/>
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