export const maintenanceService = {
  async getPersonalRepairs() {
    try {
      const repairs = await maintenanceRepository.getPersonalRepairs();
      return repairs.map((item) => {
        const maintenanceDate = item.maintenanceDate ? new Date(item.maintenanceDate) : null;
        const vehicleName = [item.vehicleName, item.variantName, item.colorName]
          .filter(Boolean)
          .join(' - ');

        return {
          id: item.id,
          serviceName: item.serviceType || item.description || 'Bảo dưỡng xe',
          description: item.description || '',
          date: maintenanceDate?.toLocaleDateString('vi-VN') || 'Chưa cập nhật',
          time:
            maintenanceDate?.toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            }) || '',
          status: 'Completed',
          vehicle: vehicleName || item.vehicleInfo || 'Xe của bạn',
          vinNumber: item.vinNumber || '',
          technician: item.technicianName || 'Chưa cập nhật',
          cost: Number(item.voucherFinalTotal ?? item.totalCost ?? 0),
          icon: 'ph:wrench-fill',
        };
      });
    } catch {
      return [];
    }
  },

  async getMaintenanceServices() {
    try {
      return await maintenanceRepository.getMaintenanceServices();
    } catch {
      return [];
    }
  },
};

export default maintenanceService;
