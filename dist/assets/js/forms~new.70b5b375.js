(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["forms~new"],{"4a7a":function(t,e,o){!function(e,o){t.exports=o()}("undefined"!=typeof self&&self,(function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/",o(o.s=8)}([function(t,e,o){var n=o(4),s=o(5),r=o(6);t.exports=function(t){return n(t)||s(t)||r()}},function(t,e){function o(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=o=function(t){return typeof t}:t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(e)}t.exports=o},function(t,e,o){},function(t,e){t.exports=function(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(t,e,o){"use strict";var n=o(2);o.n(n).a},function(t,e,o){"use strict";o.r(e);var n=o(0),s=o.n(n),r=o(1),i=o.n(r),a=o(3),l=o.n(a),c={props:{autoscroll:{type:Boolean,default:!0}},watch:{typeAheadPointer:function(){this.autoscroll&&this.maybeAdjustScroll()}},methods:{maybeAdjustScroll:function(){var t,e=(null===(t=this.$refs.dropdownMenu)||void 0===t?void 0:t.children[this.typeAheadPointer])||!1;if(e){var o=this.getDropdownViewport(),n=e.getBoundingClientRect(),s=n.top,r=n.bottom,i=n.height;if(s<o.top)return this.$refs.dropdownMenu.scrollTop=e.offsetTop;if(r>o.bottom)return this.$refs.dropdownMenu.scrollTop=e.offsetTop-(o.height-i)}},getDropdownViewport:function(){return this.$refs.dropdownMenu?this.$refs.dropdownMenu.getBoundingClientRect():{height:0,top:0,bottom:0}}}},u={data:function(){return{typeAheadPointer:-1}},watch:{filteredOptions:function(){for(var t=0;t<this.filteredOptions.length;t++)if(this.selectable(this.filteredOptions[t])){this.typeAheadPointer=t;break}}},methods:{typeAheadUp:function(){for(var t=this.typeAheadPointer-1;t>=0;t--)if(this.selectable(this.filteredOptions[t])){this.typeAheadPointer=t;break}},typeAheadDown:function(){for(var t=this.typeAheadPointer+1;t<this.filteredOptions.length;t++)if(this.selectable(this.filteredOptions[t])){this.typeAheadPointer=t;break}},typeAheadSelect:function(){var t=this.filteredOptions[this.typeAheadPointer];t&&this.select(t)}}},p={props:{loading:{type:Boolean,default:!1}},data:function(){return{mutableLoading:!1}},watch:{search:function(){this.$emit("search",this.search,this.toggleLoading)},loading:function(t){this.mutableLoading=t}},methods:{toggleLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return this.mutableLoading=null==t?!this.mutableLoading:t}}};function d(t,e,o,n,s,r,i,a){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=o,c._compiled=!0),n&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),i?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},c._ssrRegister=l):s&&(l=a?function(){s.call(this,this.$root.$options.shadowRoot)}:s),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,l):[l]}return{exports:t,options:c}}var m={Deselect:d({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10"}},[e("path",{attrs:{d:"M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"}})])}),[],!1,null,null,null).exports,OpenIndicator:d({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"10"}},[e("path",{attrs:{d:"M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"}})])}),[],!1,null,null,null).exports},f={inserted:function(t,e,o){var n=o.context;if(n.appendToBody){var s=n.$refs.toggle.getBoundingClientRect(),r=s.height,i=s.top,a=s.left,l=s.width,c=window.scrollX||window.pageXOffset,u=window.scrollY||window.pageYOffset;t.unbindPosition=n.calculatePosition(t,n,{width:l+"px",left:c+a+"px",top:u+i+r+"px"}),document.body.appendChild(t)}},unbind:function(t,e,o){o.context.appendToBody&&(t.unbindPosition&&"function"==typeof t.unbindPosition&&t.unbindPosition(),t.parentNode&&t.parentNode.removeChild(t))}},h=function(t){var e={};return Object.keys(t).sort().forEach((function(o){e[o]=t[o]})),JSON.stringify(e)},b=0,v=function(){return++b};function g(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function y(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?g(Object(o),!0).forEach((function(e){l()(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):g(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var _={components:y({},m),mixins:[c,u,p],directives:{appendToBody:f},props:{value:{},components:{type:Object,default:function(){return{}}},options:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},clearable:{type:Boolean,default:!0},searchable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},placeholder:{type:String,default:""},transition:{type:String,default:"vs__fade"},clearSearchOnSelect:{type:Boolean,default:!0},closeOnSelect:{type:Boolean,default:!0},label:{type:String,default:"label"},autocomplete:{type:String,default:"off"},reduce:{type:Function,default:function(t){return t}},selectable:{type:Function,default:function(t){return!0}},getOptionLabel:{type:Function,default:function(t){return"object"===i()(t)?t.hasOwnProperty(this.label)?t[this.label]:console.warn('[vue-select warn]: Label key "option.'.concat(this.label,'" does not')+" exist in options object ".concat(JSON.stringify(t),".\n")+"https://vue-select.org/api/props.html#getoptionlabel"):t}},getOptionKey:{type:Function,default:function(t){if("object"!==i()(t))return t;try{return t.hasOwnProperty("id")?t.id:h(t)}catch(e){return console.warn("[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.\nhttps://vue-select.org/api/props.html#getoptionkey",t,e)}}},onTab:{type:Function,default:function(){this.selectOnTab&&!this.isComposing&&this.typeAheadSelect()}},taggable:{type:Boolean,default:!1},tabindex:{type:Number,default:null},pushTags:{type:Boolean,default:!1},filterable:{type:Boolean,default:!0},filterBy:{type:Function,default:function(t,e,o){return(e||"").toLowerCase().indexOf(o.toLowerCase())>-1}},filter:{type:Function,default:function(t,e){var o=this;return t.filter((function(t){var n=o.getOptionLabel(t);return"number"==typeof n&&(n=n.toString()),o.filterBy(t,n,e)}))}},createOption:{type:Function,default:function(t){return"object"===i()(this.optionList[0])?l()({},this.label,t):t}},resetOnOptionsChange:{default:!1,validator:function(t){return["function","boolean"].includes(i()(t))}},clearSearchOnBlur:{type:Function,default:function(t){var e=t.clearSearchOnSelect,o=t.multiple;return e&&!o}},noDrop:{type:Boolean,default:!1},inputId:{type:String},dir:{type:String,default:"auto"},selectOnTab:{type:Boolean,default:!1},selectOnKeyCodes:{type:Array,default:function(){return[13]}},searchInputQuerySelector:{type:String,default:"[type=search]"},mapKeydown:{type:Function,default:function(t,e){return t}},appendToBody:{type:Boolean,default:!1},calculatePosition:{type:Function,default:function(t,e,o){var n=o.width,s=o.top,r=o.left;t.style.top=s,t.style.left=r,t.style.width=n}}},data:function(){return{uid:v(),search:"",open:!1,isComposing:!1,pushedTags:[],_value:[]}},watch:{options:function(t,e){var o=this;!this.taggable&&("function"==typeof o.resetOnOptionsChange?o.resetOnOptionsChange(t,e,o.selectedValue):o.resetOnOptionsChange)&&this.clearSelection(),this.value&&this.isTrackingValues&&this.setInternalValueFromOptions(this.value)},value:function(t){this.isTrackingValues&&this.setInternalValueFromOptions(t)},multiple:function(){this.clearSelection()},open:function(t){this.$emit(t?"open":"close")}},created:function(){this.mutableLoading=this.loading,void 0!==this.value&&this.isTrackingValues&&this.setInternalValueFromOptions(this.value),this.$on("option:created",this.pushTag)},methods:{setInternalValueFromOptions:function(t){var e=this;Array.isArray(t)?this.$data._value=t.map((function(t){return e.findOptionFromReducedValue(t)})):this.$data._value=this.findOptionFromReducedValue(t)},select:function(t){this.isOptionSelected(t)||(this.taggable&&!this.optionExists(t)&&this.$emit("option:created",t),this.multiple&&(t=this.selectedValue.concat(t)),this.updateValue(t)),this.onAfterSelect(t)},deselect:function(t){var e=this;this.updateValue(this.selectedValue.filter((function(o){return!e.optionComparator(o,t)})))},clearSelection:function(){this.updateValue(this.multiple?[]:null)},onAfterSelect:function(t){this.closeOnSelect&&(this.open=!this.open,this.searchEl.blur()),this.clearSearchOnSelect&&(this.search="")},updateValue:function(t){var e=this;void 0===this.value&&(this.$data._value=t),null!==t&&(t=Array.isArray(t)?t.map((function(t){return e.reduce(t)})):this.reduce(t)),this.$emit("input",t)},toggleDropdown:function(t){var e=t.target!==this.searchEl;e&&t.preventDefault(),[].concat(s()(this.$refs.deselectButtons||[]),s()([this.$refs.clearButton]||!1)).some((function(e){return e.contains(t.target)||e===t.target}))?t.preventDefault():this.open&&e?this.searchEl.blur():this.disabled||(this.open=!0,this.searchEl.focus())},isOptionSelected:function(t){var e=this;return this.selectedValue.some((function(o){return e.optionComparator(o,t)}))},optionComparator:function(t,e){return this.getOptionKey(t)===this.getOptionKey(e)},findOptionFromReducedValue:function(t){var e=this,o=[].concat(s()(this.options),s()(this.pushedTags)).filter((function(o){return JSON.stringify(e.reduce(o))===JSON.stringify(t)}));return 1===o.length?o[0]:o.find((function(t){return e.optionComparator(t,e.$data._value)}))||t},closeSearchOptions:function(){this.open=!1,this.$emit("search:blur")},maybeDeleteValue:function(){if(!this.searchEl.value.length&&this.selectedValue&&this.selectedValue.length&&this.clearable){var t=null;this.multiple&&(t=s()(this.selectedValue.slice(0,this.selectedValue.length-1))),this.updateValue(t)}},optionExists:function(t){var e=this;return this.optionList.some((function(o){return e.optionComparator(o,t)}))},normalizeOptionForSlot:function(t){return"object"===i()(t)?t:l()({},this.label,t)},pushTag:function(t){this.pushedTags.push(t)},onEscape:function(){this.search.length?this.search="":this.searchEl.blur()},onSearchBlur:function(){if(!this.mousedown||this.searching){var t=this.clearSearchOnSelect,e=this.multiple;return this.clearSearchOnBlur({clearSearchOnSelect:t,multiple:e})&&(this.search=""),void this.closeSearchOptions()}this.mousedown=!1,0!==this.search.length||0!==this.options.length||this.closeSearchOptions()},onSearchFocus:function(){this.open=!0,this.$emit("search:focus")},onMousedown:function(){this.mousedown=!0},onMouseUp:function(){this.mousedown=!1},onSearchKeyDown:function(t){var e=this,o=function(t){return t.preventDefault(),!e.isComposing&&e.typeAheadSelect()},n={8:function(t){return e.maybeDeleteValue()},9:function(t){return e.onTab()},27:function(t){return e.onEscape()},38:function(t){return t.preventDefault(),e.typeAheadUp()},40:function(t){return t.preventDefault(),e.typeAheadDown()}};this.selectOnKeyCodes.forEach((function(t){return n[t]=o}));var s=this.mapKeydown(n,this);if("function"==typeof s[t.keyCode])return s[t.keyCode](t)}},computed:{isTrackingValues:function(){return void 0===this.value||this.$options.propsData.hasOwnProperty("reduce")},selectedValue:function(){var t=this.value;return this.isTrackingValues&&(t=this.$data._value),t?[].concat(t):[]},optionList:function(){return this.options.concat(this.pushTags?this.pushedTags:[])},searchEl:function(){return this.$scopedSlots.search?this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector):this.$refs.search},scope:function(){var t=this,e={search:this.search,loading:this.loading,searching:this.searching,filteredOptions:this.filteredOptions};return{search:{attributes:y({disabled:this.disabled,placeholder:this.searchPlaceholder,tabindex:this.tabindex,readonly:!this.searchable,id:this.inputId,"aria-autocomplete":"list","aria-labelledby":"vs".concat(this.uid,"__combobox"),"aria-controls":"vs".concat(this.uid,"__listbox"),ref:"search",type:"search",autocomplete:this.autocomplete,value:this.search},this.dropdownOpen&&this.filteredOptions[this.typeAheadPointer]?{"aria-activedescendant":"vs".concat(this.uid,"__option-").concat(this.typeAheadPointer)}:{}),events:{compositionstart:function(){return t.isComposing=!0},compositionend:function(){return t.isComposing=!1},keydown:this.onSearchKeyDown,blur:this.onSearchBlur,focus:this.onSearchFocus,input:function(e){return t.search=e.target.value}}},spinner:{loading:this.mutableLoading},noOptions:{search:this.search,loading:this.loading,searching:this.searching},openIndicator:{attributes:{ref:"openIndicator",role:"presentation",class:"vs__open-indicator"}},listHeader:e,listFooter:e,header:y({},e,{deselect:this.deselect}),footer:y({},e,{deselect:this.deselect})}},childComponents:function(){return y({},m,{},this.components)},stateClasses:function(){return{"vs--open":this.dropdownOpen,"vs--single":!this.multiple,"vs--searching":this.searching&&!this.noDrop,"vs--searchable":this.searchable&&!this.noDrop,"vs--unsearchable":!this.searchable,"vs--loading":this.mutableLoading,"vs--disabled":this.disabled}},searching:function(){return!!this.search},dropdownOpen:function(){return!this.noDrop&&this.open&&!this.mutableLoading},searchPlaceholder:function(){if(this.isValueEmpty&&this.placeholder)return this.placeholder},filteredOptions:function(){var t=[].concat(this.optionList);if(!this.filterable&&!this.taggable)return t;var e=this.search.length?this.filter(t,this.search,this):t;if(this.taggable&&this.search.length){var o=this.createOption(this.search);this.optionExists(o)||e.unshift(o)}return e},isValueEmpty:function(){return 0===this.selectedValue.length},showClearButton:function(){return!this.multiple&&this.clearable&&!this.open&&!this.isValueEmpty}}},O=(o(7),d(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"v-select",class:t.stateClasses,attrs:{dir:t.dir}},[t._t("header",null,null,t.scope.header),t._v(" "),o("div",{ref:"toggle",staticClass:"vs__dropdown-toggle",attrs:{id:"vs"+t.uid+"__combobox",role:"combobox","aria-expanded":t.dropdownOpen.toString(),"aria-owns":"vs"+t.uid+"__listbox","aria-label":"Search for option"},on:{mousedown:function(e){return t.toggleDropdown(e)}}},[o("div",{ref:"selectedOptions",staticClass:"vs__selected-options"},[t._l(t.selectedValue,(function(e){return t._t("selected-option-container",[o("span",{key:t.getOptionKey(e),staticClass:"vs__selected"},[t._t("selected-option",[t._v("\n            "+t._s(t.getOptionLabel(e))+"\n          ")],null,t.normalizeOptionForSlot(e)),t._v(" "),t.multiple?o("button",{ref:"deselectButtons",refInFor:!0,staticClass:"vs__deselect",attrs:{disabled:t.disabled,type:"button",title:"Deselect "+t.getOptionLabel(e),"aria-label":"Deselect "+t.getOptionLabel(e)},on:{click:function(o){return t.deselect(e)}}},[o(t.childComponents.Deselect,{tag:"component"})],1):t._e()],2)],{option:t.normalizeOptionForSlot(e),deselect:t.deselect,multiple:t.multiple,disabled:t.disabled})})),t._v(" "),t._t("search",[o("input",t._g(t._b({staticClass:"vs__search"},"input",t.scope.search.attributes,!1),t.scope.search.events))],null,t.scope.search)],2),t._v(" "),o("div",{ref:"actions",staticClass:"vs__actions"},[o("button",{directives:[{name:"show",rawName:"v-show",value:t.showClearButton,expression:"showClearButton"}],ref:"clearButton",staticClass:"vs__clear",attrs:{disabled:t.disabled,type:"button",title:"Clear Selected","aria-label":"Clear Selected"},on:{click:t.clearSelection}},[o(t.childComponents.Deselect,{tag:"component"})],1),t._v(" "),t._t("open-indicator",[t.noDrop?t._e():o(t.childComponents.OpenIndicator,t._b({tag:"component"},"component",t.scope.openIndicator.attributes,!1))],null,t.scope.openIndicator),t._v(" "),t._t("spinner",[o("div",{directives:[{name:"show",rawName:"v-show",value:t.mutableLoading,expression:"mutableLoading"}],staticClass:"vs__spinner"},[t._v("Loading...")])],null,t.scope.spinner)],2)]),t._v(" "),o("transition",{attrs:{name:t.transition}},[t.dropdownOpen?o("ul",{directives:[{name:"append-to-body",rawName:"v-append-to-body"}],key:"vs"+t.uid+"__listbox",ref:"dropdownMenu",staticClass:"vs__dropdown-menu",attrs:{id:"vs"+t.uid+"__listbox",role:"listbox"},on:{mousedown:function(e){return e.preventDefault(),t.onMousedown(e)},mouseup:t.onMouseUp}},[t._t("list-header",null,null,t.scope.listHeader),t._v(" "),t._l(t.filteredOptions,(function(e,n){return o("li",{key:t.getOptionKey(e),staticClass:"vs__dropdown-option",class:{"vs__dropdown-option--selected":t.isOptionSelected(e),"vs__dropdown-option--highlight":n===t.typeAheadPointer,"vs__dropdown-option--disabled":!t.selectable(e)},attrs:{role:"option",id:"vs"+t.uid+"__option-"+n,"aria-selected":n===t.typeAheadPointer||null},on:{mouseover:function(o){t.selectable(e)&&(t.typeAheadPointer=n)},mousedown:function(o){o.preventDefault(),o.stopPropagation(),t.selectable(e)&&t.select(e)}}},[t._t("option",[t._v("\n          "+t._s(t.getOptionLabel(e))+"\n        ")],null,t.normalizeOptionForSlot(e))],2)})),t._v(" "),0===t.filteredOptions.length?o("li",{staticClass:"vs__no-options"},[t._t("no-options",[t._v("Sorry, no matching options.")],null,t.scope.noOptions)],2):t._e(),t._v(" "),t._t("list-footer",null,null,t.scope.listFooter)],2):o("ul",{staticStyle:{display:"none",visibility:"hidden"},attrs:{id:"vs"+t.uid+"__listbox",role:"listbox"}})]),t._v(" "),t._t("footer",null,null,t.scope.footer)],2)}),[],!1,null,null,null).exports),w={ajax:p,pointer:u,pointerScroll:c};o.d(e,"VueSelect",(function(){return O})),o.d(e,"mixins",(function(){return w})),e.default=O}])}))},"6dfc":function(t,e,o){},bf2b:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("b-row",[o("b-colxx",{attrs:{xxs:"12"}},[o("piaf-breadcrumb",{attrs:{heading:t.$t("menu.forms")}}),t._v(" "),o("div",{staticClass:"separator mb-5"})],1)],1),t._v(" "),o("b-row",[o("b-colxx",{attrs:{xxs:"12"}},[o("b-card",{staticClass:"mb-4",attrs:{title:t.$t("forms.basic")}},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.onBasicSubmit(e)}}},[o("b-form-group",{attrs:{label:t.$t("forms.email"),description:t.$t("forms.email-muted")}},[o("b-form-input",{attrs:{type:"email",placeholder:t.$t("forms.email")},model:{value:t.basicForm.email,callback:function(e){t.$set(t.basicForm,"email",e)},expression:"basicForm.email"}})],1),t._v(" "),o("b-form-group",{attrs:{label:t.$t("forms.password")}},[o("b-form-input",{attrs:{type:"password",placeholder:t.$t("forms.password")},model:{value:t.basicForm.password,callback:function(e){t.$set(t.basicForm,"password",e)},expression:"basicForm.password"}})],1),t._v(" "),o("b-form-group",[o("b-form-checkbox",{model:{value:t.basicForm.checked,callback:function(e){t.$set(t.basicForm,"checked",e)},expression:"basicForm.checked"}},[t._v(t._s(t.$t("forms.custom-checkbox")))])],1),t._v(" "),o("b-button",{staticClass:"mt-4",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.$t("forms.submit")))])],1)],1)],1)],1),t._v(" "),o("b-row",[o("b-colxx",{attrs:{xxs:"12"}},[o("b-card",{staticClass:"mb-4",attrs:{title:t.$t("forms.horizontal")}},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.onHorizontalSubmit(e)}}},[o("b-form-group",{attrs:{"label-cols":"2",horizontal:"",label:t.$t("forms.email")}},[o("b-form-input",{attrs:{placeholder:t.$t("forms.email")},model:{value:t.horizontalForm.email,callback:function(e){t.$set(t.horizontalForm,"email",e)},expression:"horizontalForm.email"}})],1),t._v(" "),o("b-form-group",{attrs:{"label-cols":"2",horizontal:"",label:t.$t("forms.password")}},[o("b-form-input",{attrs:{type:"password",placeholder:t.$t("forms.password")},model:{value:t.horizontalForm.password,callback:function(e){t.$set(t.horizontalForm,"password",e)},expression:"horizontalForm.password"}})],1),t._v(" "),o("b-form-group",{attrs:{"label-cols":"2",horizontal:"",label:t.$t("forms.radios")}},[o("b-form-radio-group",{staticClass:"pt-2",attrs:{stacked:"",options:t.horizontalFormRadios},model:{value:t.horizontalForm.radio,callback:function(e){t.$set(t.horizontalForm,"radio",e)},expression:"horizontalForm.radio"}})],1),t._v(" "),o("b-form-group",{attrs:{"label-cols":"2",horizontal:"",label:t.$t("forms.checkbox")}},[o("b-form-checkbox",{model:{value:t.horizontalForm.checked,callback:function(e){t.$set(t.horizontalForm,"checked",e)},expression:"horizontalForm.checked"}},[t._v(t._s(t.$t("forms.custom-checkbox")))])],1),t._v(" "),o("b-button",{staticClass:"mt-4",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.$t("forms.signin")))])],1)],1)],1)],1),t._v(" "),o("b-row",[o("b-colxx",{attrs:{xxs:"12"}},[o("b-card",{staticClass:"mb-4",attrs:{title:t.$t("forms.top-labels-over-line")}},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.onTopLabelsOverLineFormSubmit(e)}}},[o("label",{staticClass:"form-group has-float-label"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.topLabelsOverLineForm.email,expression:"topLabelsOverLineForm.email"}],staticClass:"form-control",attrs:{type:"email"},domProps:{value:t.topLabelsOverLineForm.email},on:{input:function(e){e.target.composing||t.$set(t.topLabelsOverLineForm,"email",e.target.value)}}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.email")))])]),t._v(" "),o("label",{staticClass:"form-group has-float-label"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.topLabelsOverLineForm.password,expression:"topLabelsOverLineForm.password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.topLabelsOverLineForm.password},on:{input:function(e){e.target.composing||t.$set(t.topLabelsOverLineForm,"password",e.target.value)}}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.password")))])]),t._v(" "),o("div",{staticClass:"form-group has-float-label"},[o("input-tag",{model:{value:t.topLabelsOverLineForm.tags,callback:function(e){t.$set(t.topLabelsOverLineForm,"tags",e)},expression:"topLabelsOverLineForm.tags"}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.tags")))])],1),t._v(" "),o("div",{staticClass:"form-group has-float-label"},[o("v-date-picker",{attrs:{mode:"single","input-props":{class:"form-control",placeholder:t.$t("form-components.date")}},model:{value:t.topLabelsOverLineForm.date,callback:function(e){t.$set(t.topLabelsOverLineForm,"date",e)},expression:"topLabelsOverLineForm.date"}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.date")))])],1),t._v(" "),o("div",{staticClass:"form-group has-float-label"},[o("v-select",{attrs:{options:t.selectData,dir:t.direction},model:{value:t.topLabelsOverLineForm.select,callback:function(e){t.$set(t.topLabelsOverLineForm,"select",e)},expression:"topLabelsOverLineForm.select"}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.state")))])],1),t._v(" "),o("b-button",{staticClass:"mt-4",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.$t("forms.submit")))])],1)],1)],1)],1),t._v(" "),o("b-row",[o("b-colxx",{attrs:{xxs:"12"}},[o("b-card",{staticClass:"mb-4",attrs:{title:t.$t("forms.top-labels-in-input")}},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.onTopLabelsInInputFormSubmit(e)}}},[o("label",{staticClass:"form-group has-top-label"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.topLabelsInInputForm.email,expression:"topLabelsInInputForm.email"}],staticClass:"form-control",attrs:{type:"email"},domProps:{value:t.topLabelsInInputForm.email},on:{input:function(e){e.target.composing||t.$set(t.topLabelsInInputForm,"email",e.target.value)}}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.email-u")))])]),t._v(" "),o("label",{staticClass:"form-group has-top-label"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.topLabelsInInputForm.password,expression:"topLabelsInInputForm.password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.topLabelsInInputForm.password},on:{input:function(e){e.target.composing||t.$set(t.topLabelsInInputForm,"password",e.target.value)}}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.password-u")))])]),t._v(" "),o("div",{staticClass:"form-group has-top-label"},[o("input-tag",{model:{value:t.topLabelsInInputForm.tags,callback:function(e){t.$set(t.topLabelsInInputForm,"tags",e)},expression:"topLabelsInInputForm.tags"}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.tags-u")))])],1),t._v(" "),o("div",{staticClass:"form-group has-top-label"},[o("v-date-picker",{attrs:{mode:"single","input-props":{class:"form-control",placeholder:t.$t("form-components.date")}},model:{value:t.topLabelsInInputForm.date,callback:function(e){t.$set(t.topLabelsInInputForm,"date",e)},expression:"topLabelsInInputForm.date"}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.date-u")))])],1),t._v(" "),o("div",{staticClass:"form-group has-top-label"},[o("v-select",{attrs:{options:t.selectData,dir:t.direction},model:{value:t.topLabelsInInputForm.select,callback:function(e){t.$set(t.topLabelsInInputForm,"select",e)},expression:"topLabelsInInputForm.select"}}),t._v(" "),o("span",[t._v(t._s(t.$t("forms.state-u")))])],1),t._v(" "),o("b-button",{staticClass:"mt-4",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.$t("forms.submit")))])],1)],1)],1)],1),t._v(" "),o("b-row",[o("b-colxx",{attrs:{xxs:"12"}},[o("b-card",{staticClass:"mb-4",attrs:{title:t.$t("forms.grid")}},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.onGridFormSubmit(e)}}},[o("b-row",[o("b-colxx",{attrs:{sm:"6"}},[o("b-form-group",{attrs:{label:t.$t("forms.email")}},[o("b-form-input",{attrs:{type:"email"},model:{value:t.gridForm.email,callback:function(e){t.$set(t.gridForm,"email",e)},expression:"gridForm.email"}})],1)],1),t._v(" "),o("b-colxx",{attrs:{sm:"6"}},[o("b-form-group",{attrs:{label:t.$t("forms.password")}},[o("b-form-input",{attrs:{type:"password"},model:{value:t.gridForm.password,callback:function(e){t.$set(t.gridForm,"password",e)},expression:"gridForm.password"}})],1)],1),t._v(" "),o("b-colxx",{attrs:{sm:"12"}},[o("b-form-group",{attrs:{label:t.$t("forms.address")}},[o("b-form-input",{model:{value:t.gridForm.address1,callback:function(e){t.$set(t.gridForm,"address1",e)},expression:"gridForm.address1"}})],1)],1),t._v(" "),o("b-colxx",{attrs:{sm:"12"}},[o("b-form-group",{attrs:{label:t.$t("forms.address2")}},[o("b-form-input",{model:{value:t.gridForm.address2,callback:function(e){t.$set(t.gridForm,"address2",e)},expression:"gridForm.address2"}})],1)],1),t._v(" "),o("b-colxx",{attrs:{sm:"6"}},[o("b-form-group",{attrs:{label:t.$t("forms.city")}},[o("b-form-input",{model:{value:t.gridForm.city,callback:function(e){t.$set(t.gridForm,"city",e)},expression:"gridForm.city"}})],1)],1),t._v(" "),o("b-colxx",{attrs:{sm:"4"}},[o("b-form-group",{attrs:{label:t.$t("forms.state")}},[o("b-form-select",{attrs:{options:t.stateOptions,plain:""},model:{value:t.gridForm.state,callback:function(e){t.$set(t.gridForm,"state",e)},expression:"gridForm.state"}})],1)],1),t._v(" "),o("b-colxx",{attrs:{sm:"2"}},[o("b-form-group",{attrs:{label:t.$t("forms.zip")}},[o("b-form-input",{model:{value:t.gridForm.zip,callback:function(e){t.$set(t.gridForm,"zip",e)},expression:"gridForm.zip"}})],1)],1)],1),t._v(" "),o("b-button",{staticClass:"mt-4",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.$t("forms.signin")))])],1)],1)],1)],1),t._v(" "),o("b-row",[o("b-colxx",{attrs:{xxs:"12"}},[o("b-card",{staticClass:"mb-4",attrs:{title:t.$t("forms.inline")}},[o("b-form",{attrs:{inline:""},on:{submit:function(e){return e.preventDefault(),t.onInlineSubmit(e)}}},[o("b-input-group",[o("b-form-input",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{type:"text",placeholder:t.$t("forms.firstname")},model:{value:t.inlineForm.fullname,callback:function(e){t.$set(t.inlineForm,"fullname",e)},expression:"inlineForm.fullname"}})],1),t._v(" "),o("b-input-group",{attrs:{prepend:"@"}},[o("b-form-input",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{type:"text",placeholder:t.$t("forms.lastname")},model:{value:t.inlineForm.lastname,callback:function(e){t.$set(t.inlineForm,"lastname",e)},expression:"inlineForm.lastname"}})],1),t._v(" "),o("b-form-group",[o("b-form-checkbox",{staticClass:"mb-2 mr-sm-2 mb-sm-0",model:{value:t.inlineForm.checked,callback:function(e){t.$set(t.inlineForm,"checked",e)},expression:"inlineForm.checked"}},[t._v(t._s(t.$t("forms.custom-checkbox")))])],1),t._v(" "),o("b-button",{attrs:{type:"submit",variant:"outline-primary",size:"sm"}},[t._v(t._s(t.$t("forms.submit")))])],1)],1)],1)],1)],1)},s=[],r=o("6b8b"),i=o("4a7a"),a=o.n(i),l=(o("6dfc"),o("ed08")),c={components:{"input-tag":r["a"],"v-select":a.a},data:function(){return{name:"",age:0,basicForm:{email:"",password:"",checked:!1},horizontalForm:{email:"",password:"",radio:"",checked:!1},topLabelsOverLineForm:{email:"",password:"",tags:[],date:null,select:"",checked:!1},topLabelsInInputForm:{email:"",password:"",tags:[],date:null,select:"",checked:!1},gridForm:{email:"",password:"",address1:"",address2:"",city:"",state:"",zip:""},inlineForm:{fullname:"",lastname:"",checked:!1},direction:Object(l["e"])().direction,horizontalFormRadios:[this.$t("forms.first-radio"),this.$t("forms.second-radio"),{text:this.$t("forms.third-radio-disabled"),disabled:!0}],selectData:[{label:"Chocolate",value:"chocolate"},{label:"Vanilla",value:"vanilla"},{label:"Strawberry",value:"strawberry"},{label:"Caramel",value:"caramel"},{label:"Cookies and Cream",value:"cookiescream"},{label:"Peppermint",value:"peppermint"}],stateOptions:["","Option1","Option2","Option3","Option4","Option5"]}},methods:{onBasicSubmit:function(){console.log(JSON.stringify(this.basicForm))},onHorizontalSubmit:function(){console.log(JSON.stringify(this.horizontalForm))},onTopLabelsOverLineFormSubmit:function(){console.log(JSON.stringify(this.topLabelsOverLineForm))},onTopLabelsInInputFormSubmit:function(){console.log(JSON.stringify(this.topLabelsInInputForm))},onGridFormSubmit:function(){console.log(JSON.stringify(this.gridForm))},onInlineSubmit:function(){console.log(JSON.stringify(this.inlineForm))}}},u=c,p=o("2877"),d=Object(p["a"])(u,n,s,!1,null,null,null);e["default"]=d.exports}}]);