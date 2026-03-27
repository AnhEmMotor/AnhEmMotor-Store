<template>
	<component
		:is="to ? RouterLink : 'button'"
		v-bind="attrs"
		:to="to"
		:class="classes"
		:disabled="disabled"
		:aria-disabled="disabled ? 'true' : 'false'"
		@click="onClick"
	>
		<slot />
	</component>
</template>

<script setup>
import { useAttrs } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
	to: { type: [String, Object], default: null },
	disabled: { type: Boolean, default: false },
});

const emits = defineEmits(["click"]);

const attrs = useAttrs();

const classes =
	"w-full bg-gradient-to-r from-[#de0000] to-[#b30000] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition duration-300";

function onClick(e) {
	if (props.disabled) {
		if (e) {
			e.preventDefault();
		}
		return;
	}
	emits("click", e);
}
</script>
