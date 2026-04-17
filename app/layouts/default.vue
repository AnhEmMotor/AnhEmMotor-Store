<script setup></script>

<template>
	<div class="flex flex-col">
		<LayoutTheHeader />
		<main class="grow mx-auto w-full pt-16 sm:pt-20">
			<slot />
		</main>

        <CommonFloatingContact />
		<LayoutTheFooter />
	</div>
</template>
