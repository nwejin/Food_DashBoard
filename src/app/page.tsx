'use client';

import Image from 'next/image';
import { Card, Input, Label, Button, Popover, Calendar } from '@/components';
import { Search, CalendarIcon, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { format } from 'date-fns';

const ChartPlaceholder = ({ title }: { title: string }) => (
  <div className="flex h-40 w-full items-center justify-center rounded bg-gray-100">
    <span className="text-gray-500">{title} 차트</span>
  </div>
);

export default function Home() {
  const channel = ['논문', '특허', '뉴스', '통계보고서', '사내보고서'];
  // const result = ['연도별 분포', '특허', '뉴스', '통계보고서', '사내보고서'];

  const [channels, setChannels] = useState<string[]>([]);

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleChannelChange = (value: string) => {
    setChannels((prev) => {
      if (prev.includes(value)) {
        return prev.filter((channel) => channel !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const isFormComplete =
    searchTerm && channels.length > 0 && dateRange.from && dateRange.to;

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* 헤더 영역 */}
      <div className="justify-between flex items-center mb-8 bg-white fixed w-full h-16 z-50 p-4 shadow-sm border-b-2">
        <h1 className=" text-left text-3xl font-bold">Foodtech Insight Lab</h1>

        {/* 챗봇 영역 */}
        <div className="right-4 z-50">
          <Popover.Popover>
            <Popover.PopoverTrigger asChild>
              <Button className="h-10 w-10 rounded-full shadow-lg">
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">Open QnA</span>
              </Button>
            </Popover.PopoverTrigger>
            <Popover.PopoverContent className="w-96 p-0" align="end">
              <form className="flex items-center p-2">
                <Input
                  type="text"
                  placeholder="질문을 입력하세요..."
                  className="mr-2 flex-grow"
                />
                <Button type="submit" size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </Popover.PopoverContent>
          </Popover.Popover>
        </div>
      </div>

      <div className="p-8 pt-28">
        {/* 매개변수 입력 */}
        <Card.Card className="mx-auto mb-8 max-w-4xl">
          <Card.CardHeader>
            <Card.CardTitle>분석 매개변수 설정</Card.CardTitle>
            <Card.CardDescription>
              검색어, 수집 채널, 기간을 선택하세요.
            </Card.CardDescription>
          </Card.CardHeader>
          <Card.CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* 검색어 */}
                <div className="space-y-2">
                  <Label htmlFor="searchTerm">검색어</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="searchTerm"
                      placeholder="ex) reaction flavor"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      className="pl-8"
                    />
                  </div>
                </div>
                {/* 채널 */}
                <div className="space-y-2">
                  <Label>수집 채널</Label>
                  <div className="flex flex-wrap gap-1">
                    {channel.map((channel) => (
                      <Button
                        key={channel}
                        type="button"
                        variant={
                          channels.includes(channel) ? 'default' : 'outline'
                        }
                        onClick={() => handleChannelChange(channel)}
                        size="sm"
                        className="px-2 py-1 text-xs"
                      >
                        {channel}
                      </Button>
                    ))}
                  </div>
                </div>
                {/* 기간 */}
                <div className="space-y-2">
                  <Label>기간 설정</Label>
                  <Popover.Popover>
                    <Popover.PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          (!dateRange.from || !dateRange.to) &&
                            'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from && dateRange.to ? (
                          <>
                            {format(dateRange.from, 'yyyy-MM-dd')} ~{' '}
                            {format(dateRange.to, 'yyyy-MM-dd')}
                          </>
                        ) : (
                          <span>날짜를 선택하세요</span>
                        )}
                      </Button>
                    </Popover.PopoverTrigger>
                    <Popover.PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) =>
                          setDateRange({
                            from: range?.from,
                            to: range?.to,
                          })
                        }
                        initialFocus
                      />
                    </Popover.PopoverContent>
                  </Popover.Popover>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-4 py-2 text-sm"
                  variant={isFormComplete ? 'default' : 'disabled'}
                >
                  분석 시작
                </Button>
              </div>
            </form>
          </Card.CardContent>
        </Card.Card>

        {/* 결과 */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-lg">연도별 분포</Card.CardTitle>
            </Card.CardHeader>
            <Card.CardContent>
              <ChartPlaceholder title="연도별 분포" />
            </Card.CardContent>
          </Card.Card>

          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-lg">저널별 분포</Card.CardTitle>
            </Card.CardHeader>
            <Card.CardContent>
              <ChartPlaceholder title="저널별 분석" />
            </Card.CardContent>
          </Card.Card>

          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-lg">카테고리 분포</Card.CardTitle>
            </Card.CardHeader>
            <Card.CardContent>
              <ChartPlaceholder title="카테고리별 분포" />
            </Card.CardContent>
          </Card.Card>

          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-lg">
                키워드 워드클라우드
              </Card.CardTitle>
            </Card.CardHeader>
            <Card.CardContent>
              <ChartPlaceholder title="키워드 네트워크" />
            </Card.CardContent>
          </Card.Card>

          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-lg">다빈도 키워드</Card.CardTitle>
            </Card.CardHeader>
            <Card.CardContent>
              <ChartPlaceholder title="감성 분석" />
            </Card.CardContent>
          </Card.Card>

          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-lg">다빈도 식품군</Card.CardTitle>
            </Card.CardHeader>
            <Card.CardContent>
              <ChartPlaceholder title="토픽 모델링" />
            </Card.CardContent>
          </Card.Card>

          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-lg">지역별 분포</Card.CardTitle>
            </Card.CardHeader>
            <Card.CardContent>
              <ChartPlaceholder title="주요 엔티티" />
            </Card.CardContent>
          </Card.Card>
        </div>
      </div>
    </div>
  );
}
