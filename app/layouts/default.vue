<script setup></script>

<template>
	<div class="flex flex-col">
		<LayoutTheHeader />
		<main class="grow mx-auto w-full pt-[72px] lg:pt-[104px]">
			<slot />
		</main>
        <CommonFloatingContact />
		<ProductCompareBar />
		<LayoutTheFooter />
	</div>
</template>
