import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Search, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  filters?: {
    category?: string;
    status?: string;
    dateRange?: {
      from?: Date;
      to?: Date;
    };
    paymentMethod?: string;
    store?: string;
  };
  onFilterChange?: (filters: any) => void;
  onClearFilters?: () => void;
  options?: {
    categories?: string[];
    statuses?: string[];
    paymentMethods?: string[];
    stores?: string[];
  };
  placeholder?: string;
}

const Filters: React.FC<FilterProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  filters = {},
  onFilterChange,
  onClearFilters,
  options = {},
  placeholder = "Buscar..."
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const handleFilterChange = (key: string, value: any) => {
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        [key]: value
      });
    }
  };

  const handleDateRangeChange = (field: 'from' | 'to', date: Date | undefined) => {
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          [field]: date
        }
      });
    }
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (value === null || value === undefined || value === '') return false;
    if (typeof value === 'object' && 'from' in value && 'to' in value) {
      return value.from || value.to;
    }
    return true;
  }).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={onSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filtros Avançados</CardTitle>
              <div className="flex gap-2">
                {onClearFilters && (
                  <Button variant="outline" size="sm" onClick={onClearFilters}>
                    Limpar
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category Filter */}
              {options.categories && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoria</label>
                  <Select
                    value={filters.category || ''}
                    onValueChange={(value) => handleFilterChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      {options.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Status Filter */}
              {options.statuses && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={filters.status || ''}
                    onValueChange={(value) => handleFilterChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os status</SelectItem>
                      {options.statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Payment Method Filter */}
              {options.paymentMethods && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Pagamento</label>
                  <Select
                    value={filters.paymentMethod || ''}
                    onValueChange={(value) => handleFilterChange('paymentMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os métodos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os métodos</SelectItem>
                      {options.paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Store Filter */}
              {options.stores && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Loja</label>
                  <Select
                    value={filters.store || ''}
                    onValueChange={(value) => handleFilterChange('store', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as lojas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as lojas</SelectItem>
                      {options.stores.map((store) => (
                        <SelectItem key={store} value={store}>
                          {store}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Date Range Filter */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Período</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !filters.dateRange?.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange?.from
                          ? format(filters.dateRange.from, "dd/MM/yyyy")
                          : "Data inicial"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange?.from}
                        onSelect={(date) => handleDateRangeChange('from', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !filters.dateRange?.to && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange?.to
                          ? format(filters.dateRange.to, "dd/MM/yyyy")
                          : "Data final"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange?.to}
                        onSelect={(date) => handleDateRangeChange('to', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Filters;