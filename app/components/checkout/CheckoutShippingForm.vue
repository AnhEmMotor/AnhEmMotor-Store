<script setup>
import { useOrderStore } from "@/stores/order.store";

const orderStore = useOrderStore();
</script>

<template>
	<div
		class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"
	>
		<h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
			<span
				class="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm"
				>1</span
			>
			Thông tin nhận hàng
		</h3>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<label
					class="text-xs font-black text-gray-400 uppercase tracking-widest"
					>Họ và tên</label
				>
				<input
					v-model="orderStore.shippingInfo.fullName"
					type="text"
					placeholder="Nhập họ và tên người nhận"
					class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
					:class="{
						'!border-red-500 !bg-red-50': orderStore.errors.fullName,
					}"
					@input="orderStore.errors.fullName = ''"
				>
				<p
					v-if="orderStore.errors.fullName"
					class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
				>
					{{ orderStore.errors.fullName }}
				</p>
			</div>
			<div class="space-y-2">
				<label
					class="text-xs font-black text-gray-400 uppercase tracking-widest"
					>Số điện thoại</label
				>
				<input
					v-model="orderStore.shippingInfo.phone"
					type="tel"
					placeholder="Nhập số điện thoại"
					class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
					:class="{
						'!border-red-500 !bg-red-50': orderStore.errors.phone,
					}"
					@input="orderStore.errors.phone = ''"
				>
				<p
					v-if="orderStore.errors.phone"
					class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
				>
					{{ orderStore.errors.phone }}
				</p>
			</div>
		</div>

		<div class="space-y-2">
			<label class="text-xs font-black text-gray-400 uppercase tracking-widest"
				>Địa chỉ giao hàng</label
			>
			<textarea
				v-model="orderStore.shippingInfo.address"
				rows="3"
				placeholder="Nhập địa chỉ nhận hàng chi tiết"
				class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
				:class="{
					'!border-red-500 !bg-red-50': orderStore.errors.address,
				}"
				@input="orderStore.errors.address = ''"
			/>
			<p
				v-if="orderStore.errors.address"
				class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter"
			>
				{{ orderStore.errors.address }}
			</p>
		</div>

		<div class="space-y-2">
			<label class="text-xs font-black text-gray-400 uppercase tracking-widest"
				>Ghi chú (tùy chọn)</label
			>
			<textarea
				v-model="orderStore.shippingInfo.notes"
				rows="2"
				placeholder="Lưu ý bổ sung..."
				class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
			/>
		</div>

		<!-- Checkbox yêu cầu xuất hóa đơn đỏ -->
		<div class="pt-2 flex flex-col gap-4">
			<div class="flex items-center gap-3">
				<input 
					id="isCompanyInvoice"
					v-model="orderStore.shippingInfo.isCompanyInvoice"
					type="checkbox"
					class="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 accent-red-600 cursor-pointer"
				>
				<label 
					for="isCompanyInvoice" 
					class="text-sm font-bold text-gray-700 cursor-pointer select-none"
				>
					Xuất hóa đơn công ty (VAT)
				</label>
			</div>

			<!-- Form nhập thông tin doanh nghiệp (VAT) -->
			<div 
				v-if="orderStore.shippingInfo.isCompanyInvoice"
				class="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4 animate-in fade-in duration-300 text-left"
			>
				<h4 class="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
					<Icon name="fa6-solid:file-invoice-dollar" class="text-red-500" />
					Thông tin xuất hóa đơn công ty (VAT)
				</h4>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên công ty <span class="text-red-500">*</span></label>
						<input 
							v-model="orderStore.shippingInfo.companyName" 
							type="text" 
							placeholder="Ví dụ: Công ty TNHH Motor Anh Em"
							class="w-full px-5 py-3.5 bg-white border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
							:class="{ '!border-red-500 !bg-red-50': orderStore.errors.companyName }"
							@input="orderStore.errors.companyName = ''"
						/>
						<p v-if="orderStore.errors.companyName" class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter">{{ orderStore.errors.companyName }}</p>
					</div>
					
					<div class="space-y-2">
						<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mã số thuế <span class="text-red-500">*</span></label>
						<input 
							v-model="orderStore.shippingInfo.companyTaxCode" 
							type="text" 
							placeholder="Ví dụ: 0102030405 hoặc 123"
							class="w-full px-5 py-3.5 bg-white border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
							:class="{ '!border-red-500 !bg-red-50': orderStore.errors.companyTaxCode }"
							@input="orderStore.errors.companyTaxCode = ''"
						/>
						<p v-if="orderStore.errors.companyTaxCode" class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter">{{ orderStore.errors.companyTaxCode }}</p>
					</div>

					<div class="md:col-span-2 space-y-2">
						<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Địa chỉ công ty <span class="text-red-500">*</span></label>
						<input 
							v-model="orderStore.shippingInfo.companyAddress" 
							type="text" 
							placeholder="Ví dụ: 123 Đường Láng, Đống Đa, Hà Nội"
							class="w-full px-5 py-3.5 bg-white border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
							:class="{ '!border-red-500 !bg-red-50': orderStore.errors.companyAddress }"
							@input="orderStore.errors.companyAddress = ''"
						/>
						<p v-if="orderStore.errors.companyAddress" class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter">{{ orderStore.errors.companyAddress }}</p>
					</div>

					<div class="space-y-2">
						<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email nhận hóa đơn (tùy chọn)</label>
						<input 
							v-model="orderStore.shippingInfo.companyEmail" 
							type="text" 
							placeholder="Ví dụ: invoice@anhem.com"
							class="w-full px-5 py-3.5 bg-white border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
							:class="{ '!border-red-500 !bg-red-50': orderStore.errors.companyEmail }"
							@input="orderStore.errors.companyEmail = ''"
						/>
						<p v-if="orderStore.errors.companyEmail" class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter">{{ orderStore.errors.companyEmail }}</p>
					</div>

					<div class="space-y-2">
						<label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mã đơn vị ngân sách (tùy chọn)</label>
						<input 
							v-model="orderStore.shippingInfo.budgetCode" 
							type="text" 
							placeholder="Ví dụ: 1045678"
							class="w-full px-5 py-3.5 bg-white border-2 border-transparent focus:border-red-500/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm"
							:class="{ '!border-red-500 !bg-red-50': orderStore.errors.budgetCode }"
							@input="orderStore.errors.budgetCode = ''"
						/>
						<p v-if="orderStore.errors.budgetCode" class="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase tracking-tighter">{{ orderStore.errors.budgetCode }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
