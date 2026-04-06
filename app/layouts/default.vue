<script setup></script>

<template>
	<div class="flex flex-col">
		<LayoutTheHeader />
		<main class="grow mx-auto w-full pt-20 sm:pt-28">
			<slot />
		</main>
        <CommonFloatingContact />
		<LayoutTheFooter />
	</div>
</template>
