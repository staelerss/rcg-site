/**
*	ViewHidable Item Class
*/
function MenuItem(controls,target){
	
	this._class = null;
	this.display = true;	
	
	this.target = document.getElementById(target);

	this.controls = new Array();
	for(var i=0; i < controls.length; i++){
		var obj = document.getElementById(controls[i]);
		obj._parent = this;
		obj.onclick = _onClick;
		this.controls.push(obj);
	}
	
	this.hide = _hideItem;
	this.view = _viewItem;
}

function _hideItem(){

	this.target.style.display = "none";
	this.display = false; 
}

function _viewItem(){

	this.target.style.display = "block";
	this.display = true; 
}

function _onClick(){
	if(this._parent.display){
		this._parent.hide();
	}else{
		this._parent.view();
	}
	if(this._parent._class){ // if class isset
		this._parent._class.onItemClick(this._parent);
	}
	return false;
}
/**
*	Item Set Class
*/
function MenuSet(){
	this.menuItems = new Array();
	this.currentItem = null;

	this.addItem = _addMenuItem;
	this.hideAllItems = _hideAllMenuItems;
	this.viewFirstItem = _viewFirstItem;
	this.onItemClick = _onItemClick;
}

function _onItemClick(item){
	this.currentItem = item;
	this.hideAllItems();
	this.currentItem.view();
}

function _viewFirstItem(){
	if(this.menuItems.length > 0){
		this.menuItems[0].view();
	}
}

function _addMenuItem(menuItem){
	menuItem._class = this;
	this.menuItems.push(menuItem);
}

function _hideAllMenuItems(){
	for(var i=0; i < this.menuItems.length; i++ ){
		this.menuItems[i].hide();
	}
}
