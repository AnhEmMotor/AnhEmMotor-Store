<script setup></script>

<template>
	<div class="flex flex-col min-h-screen overflow-x-hidden">
		<LayoutTheHeader />
		<main class="grow mx-auto w-full pt-20 sm:pt-28">
			<slot />
		</main>
		<LayoutTheFooter />
	</div>
</template>
