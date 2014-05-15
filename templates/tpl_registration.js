<script type="text/template" id="tpl_registration_base">
	<div id = "registerContainer">
		<div class = "registerStepTitle">请选择你的位置</div>
		<div class = 'registerInstruction'>
			<div id = 'registerLocationContainer'>
				<div class = "register_label" style="color:grey; size:2em;"><b>地方</b></div>
					<input id = 'registerLocationInput' class = 'registerInput' style=""/>
					<input id = 'registerCustomizeInput' class = 'registerInput' style=""/>
			</div>
		</div>
		<div class = 'registerInstruction'>
			<div id = 'registerInputFemaleContainer' class = 'registerInputGenderContainer'>
				<div id = 'registerInputFemaleLogo' class = 'registerInputGenderLogo'></div>
				<div id = 'registerInputFemaleTitle' class = 'registerInputGenderTitle'>
					<span><b>我是女生</b></span>
					<div id = 'femalecheckmark'></div>
				</div>

			</div>
			<div id = 'registerInputMaleContainer' class = 'registerInputGenderContainer'>
				<div id = 'registerInputMaleLogo' class = 'registerInputGenderLogo'></div>
				<div id = 'registerInputMaleTitle' class = 'registerInputGenderTitle'>
					<span><b>我是男生</b></span>
					<div id = 'malecheckmark'></div>
				</div>

			</div>
		</div>
		<div class = 'registerInstruction'>

			<div id = 'registerEmailContainer'>
				<div id = 'registerEmailInputLogo' class = 'registerInputLogo'></div>	

				<div id ＝ 'registerEmailInputTagContainer' class = 'registerInputTagContainer'>
					<input id = 'registerEmailInput' class = 'registerInput' placeholder="youraddress@email.com"/>
				</div>
			</div>

			<div id= 'registerSeparator' class = 'registerSeparator'></div>
			<div id = 'registerPasswordContainer'>
				<div id = 'registerPasswordInputLogo' class = 'registerInputLogo'></div>	

				<div id ＝ 'registerPasswordInputTagContainer' class = 'registerInputTagContainer'>
					<input id = 'registerPasswordInput' type="password" class = 'registerInput'/>
				</div>
			</div>
			<div id = 'registerPasswordConfirmContainer'>
				<div id = 'registerPasswordConfirmInputLogo' class = 'registerInputLogo'></div>	

				<div id ＝ 'registerPasswordConfirmInputTagContainer' class = 'registerInputTagContainer'>
					<input id = 'registerPasswordConfirmInput' type="password" class = 'registerInput'/>
				</div>
			</div>
		</div>
			
		<div class = 'registerNextStep'></div>
		<div id = 'registerFloatNotice3' class = 'registerFloatNotice'>我同意服务条款！</div> 
	</div>
</script>


<script type="text/template" id="tpl_registration_step1">
	<div class = "registerStepTitle">请选择你的位置</div>
	<div class = 'registerInstruction'>
		<div id = 'registerLocationContainer'>
			<div class = "register_label" style="color:grey; size:2em;"><b>地方</b></div>
				<input id = 'registerLocationInput' class = 'registerInput' style=""/>
				<input id = 'registerCustomizeInput' class = 'registerInput' style=""/>
		</div>
	</div>
	<div class = 'registerNextStep'></div>
</script>


<script type="text/template" id="tpl_registration_step2">
	<div id = 'registerStepTitle2' class = "registerStepTitle">选择你的性别</div>
	<div class = 'registerInstruction'>
		<div id = 'registerInputFemaleContainer' class = 'registerInputGenderContainer'>
			<div id = 'registerInputFemaleLogo' class = 'registerInputGenderLogo'></div>
			<div id = 'registerInputFemaleTitle' class = 'registerInputGenderTitle'>
				<span><b>我是女生</b></span>
				<div id = 'femalecheckmark'></div>
			</div>

		</div>
		<div id = 'registerInputMaleContainer' class = 'registerInputGenderContainer'>
			<div id = 'registerInputMaleLogo' class = 'registerInputGenderLogo'></div>
			<div id = 'registerInputMaleTitle' class = 'registerInputGenderTitle'>
				<span><b>我是男生</b></span>
				<div id = 'malecheckmark'></div>
			</div>

		</div>
	</div>
	<div class = 'registerNextStep'></div>
	<div id = 'registerFloatNotice2' class = 'registerFloatNotice'>性别不可以更改喔</div> 
	<div class = 'registerPreviousStep'></div>
</script>


<script type="text/template" id="tpl_registration_step3">
	<div class = "registerStepTitle">完成注册</div>
	<div class = 'registerInstruction'>

	<div id = 'registerEmailContainer'>
		<div id = 'registerEmailInputLogo' class = 'registerInputLogo'></div>	

		<div id ＝ 'registerEmailInputTagContainer' class = 'registerInputTagContainer'>
			<input id = 'registerEmailInput' class = 'registerInput' placeholder="youraddress@email.com"/>
		</div>
	</div>

	<div id= 'registerSeparator' class = 'registerSeparator'></div>
	<div id = 'registerPasswordContainer'>
		<div id = 'registerPasswordInputLogo' class = 'registerInputLogo'></div>	

		<div id ＝ 'registerPasswordInputTagContainer' class = 'registerInputTagContainer'>
			<input id = 'registerPasswordInput' type="password" class = 'registerInput'/>
		</div>
	</div>
	<div id = 'registerPasswordConfirmContainer'>
		<div id = 'registerPasswordConfirmInputLogo' class = 'registerInputLogo'></div>	

		<div id ＝ 'registerPasswordConfirmInputTagContainer' class = 'registerInputTagContainer'>
			<input id = 'registerPasswordConfirmInput' type="password" class = 'registerInput'/>
		</div>
	</div>
	</div>

	<div class = 'registerNextStep'></div>
	<div id = 'registerFloatNotice3' class = 'registerFloatNotice'>我同意服务条款！</div> 
	<div class = 'registerPreviousStep'></div>
</script>


<script type="text/template" id="tpl_registration_step4">
	<div class = "registerStepTitle">感谢</div>

	<div class = 'registerInstruction'>
		<div class = 'registerCheckEmail'>
		激活邮件已经发往您的邮箱<span id='registerYourEmail'>sample@email.com</span>，请查看你的邮箱，并打开邮箱中的链接激活。
		</div>
	</div>

	<div class = 'registerFinish'></div>
	<div class = 'registerFloatNotice'>回到主页</div> 
</script>