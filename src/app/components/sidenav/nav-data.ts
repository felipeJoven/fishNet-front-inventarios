import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'unidad-productiva',
        icon: 'fa-solid fa-u',
        label:'Unidad Productiva'
    },
    {
        routeLink: 'lote',
        icon: 'fa-solid fa-l',
        label:'Lote',
        items: [
            {
                routeLink: 'pesca',
                label: 'Pesca'
            },
            {
                routeLink: 'mortalidad',
                label: 'Mortalidad'
            }
        ]
    },
    {
        routeLink: 'proveedor',
        icon: 'fa-solid fa-p',
        label:'Proveedor'
    },
    {
        routeLink: 'especies',
        icon: 'fa-solid fa-e',
        label:'Especies' 
    },
    {
        routeLink: 'inventario',
        icon: 'fa-solid fa-i',
        label:'Inventario Alimentos',
        items: [
            {
                routeLink: 'inventario',
                label: 'Informe de Entrada y Salida'
            },
            {
                routeLink: 'entrada-alimentos',
                label: 'Entrada de Alimentos'
            },
            {
                routeLink: 'salida-alimentos',
                label: 'Salida de Alimentos'
            }
        ]
    },
    
];